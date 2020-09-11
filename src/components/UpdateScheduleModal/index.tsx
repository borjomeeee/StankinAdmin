import React, { KeyboardEvent, ChangeEvent } from "react";

import "./style.scss";

import Close from "@material-ui/icons/Close";

import LabeledInputComponent from "../LabeledInput";
import ButtonComponent from "../Button";

interface IUpdateScheduleModalComponentProps {
  onSubmit: (sections: string[]) => {};
}
interface IUpdateScheduleModalComponentState {
  sections: string[];
  inputValue: string;
  inputError: string;
}

class UpdateScheduleModalComponent extends React.Component<
  IUpdateScheduleModalComponentProps,
  IUpdateScheduleModalComponentState
> {
  constructor(props: IUpdateScheduleModalComponentProps) {
    super(props);

    this.state = {
      sections: [],
      inputValue: "",
      inputError: "",
    };
  }

  componentDidMount() {
    const localSections = JSON.parse(
      localStorage.getItem("@stankin_admin/sections") || "[]"
    );

    if (Array.isArray(localSections)) {
      this.setState((state) => ({
        sections: [...state.sections, ...localSections],
      }));
    }
  }

  componentDidUpdate(
    _: IUpdateScheduleModalComponentProps,
    prevState: IUpdateScheduleModalComponentState
  ) {
    if (prevState.sections !== this.state.sections) {
      localStorage.setItem(
        "@stankin_admin/sections",
        JSON.stringify(this.state.sections)
      );
    }
  }

  onSetInputValue = (value: string) => {
    this.setState({ inputValue: value, inputError: "" });
  };

  renderSection = (text: string, props?: React.ComponentProps<"div">) => {
    const onRemoveSection = () => {
      this.setState((state) => ({
        sections: state.sections.filter((item: string) => item !== text),
      }));
    };

    return (
      <div {...props} className={`${props?.className} section`}>
        <div className="section__text">{text}</div>
        <div className="section__remove" onClick={onRemoveSection}>
          <Close style={{ fontSize: 16 }} />
        </div>
      </div>
    );
  };

  onKeyPressInput = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      if (this.state.inputValue.length === 0) {
        this.setState({ inputError: "Поле не должно быть пустым!" });
      } else if (
        this.state.sections.some(
          (item: string) => item === this.state.inputValue
        )
      ) {
        this.setState({
          inputError: "Данный идентификатор уже был добавлен!",
          inputValue: "",
        });
      } else {
        this.setState((state) => ({
          sections: [...state.sections, state.inputValue],
          inputValue: "",
        }));
      }
    }
  };

  render() {
    return (
      <div className="update-schedule">
        <div className="update-schedule__input">
          <LabeledInputComponent
            label={"Идентификатор раздела"}
            value={this.state.inputValue}
            errorMsg={this.state.inputError}
            onChangeValue={this.onSetInputValue}
            onKeyPress={this.onKeyPressInput}
          />
        </div>
        <div className="update-schedule__sections-list">
          {this.state.sections.map((value: string) =>
            this.renderSection(value, { className: "update-schedule__section" })
          )}
        </div>

        <div className="update-schedule__submit">
          <ButtonComponent
            label="Обновить"
            onClick={this.props.onSubmit.bind(null, this.state.sections)}
          />
        </div>
      </div>
    );
  }
}

export default UpdateScheduleModalComponent;
