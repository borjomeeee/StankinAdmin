import React, { useState, useMemo } from "react";
import { connect, ConnectedProps } from "react-redux";

import Search from "@material-ui/icons/Search";

import IconedInputComponent from "./IconedInput.component";
import LabeledInputComponent from "./LabeledInput.component";
import ButtonComponent from "./Button.component";
import { IInitialState } from "../redux/store";
import { changeSearchGroupNameAction } from "../actions/MainScreen.actions";

const MainRightBarComponent = ({
  mainScreen,

  changeSearchGroupName,
}: ConnectedProps<typeof connector>) => {
  const [searchGroupInputText, setSearchGroupInputText] = useState(
    mainScreen.searchGroupText
  );
  const [addGroupInputText, setAddGroupInputText] = useState("");

  // ICONS
  const searchGroupTitleIcon = useMemo(() => {
    return <Search style={{ fontSize: 24 }} />;
  }, []);

  // Handlers
  const onSearchGroupInputEnter = () => {
    if (searchGroupInputText !== mainScreen.searchGroupText)
      changeSearchGroupName(searchGroupInputText);
  };

  return (
    <div className="right-bar">
      <div className="right-bar__section">
        <div className="section__label">Найти группу</div>

        <div className="section__child">
          <IconedInputComponent
            label="Название группы"
            value={searchGroupInputText}
            onChange={setSearchGroupInputText}
            onEnter={onSearchGroupInputEnter}
            icon={searchGroupTitleIcon}
          />
        </div>
      </div>

      <div className="right-bar__section">
        <div className="section__label">Добавить группу</div>

        <div className="section__child">
          <LabeledInputComponent
            label="Название группы"
            value={addGroupInputText}
            onChange={setAddGroupInputText}
          />
        </div>
      </div>

      <div className="right-bar__section">
        <div className="section__child">
          <ButtonComponent
            label="Добавить"
            onClick={() => console.log("Добавить группу!")}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  mainScreen: state.mainScreen,
});

const mapDispatchToProps = {
  changeSearchGroupName: (value: string) => changeSearchGroupNameAction(value),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MainRightBarComponent);
