import React, { useState, useMemo } from "react";
import { connect, ConnectedProps } from "react-redux";

import { IInitialState } from "../redux/store";

import Search from "@material-ui/icons/Search";

import IconedInputComponent from "./IconedInput.component";
import LabeledInputComponent from "./LabeledInput.component";
import ButtonComponent from "./Button.component";

import {
  changeSearchGroupNameAction,
  addGroupAction,
} from "../actions/MainScreen.actions";

import { IGroup } from "../models/Group.model";

const MainRightBarComponent = ({
  mainScreen,
  groups,

  changeSearchGroupName,
  addGroup,
}: ConnectedProps<typeof connector>) => {
  const [searchGroupInputText, setSearchGroupInputText] = useState(
    mainScreen.searchGroupText
  );
  const [addGroupInputText, setAddGroupInputText] = useState("");
  const [addGroupInputError, setAddGroupInputError] = useState("");

  // ICONS
  const searchGroupTitleIcon = useMemo(() => {
    return <Search style={{ fontSize: 24 }} />;
  }, []);

  // Handlers
  const onSearchGroupInputEnter = () => {
    if (searchGroupInputText !== mainScreen.searchGroupText)
      changeSearchGroupName(searchGroupInputText);
  };

  const onChangeAddGroupInputText = (value: string) => {
    setAddGroupInputText(value);

    if (addGroupInputError) {
      setAddGroupInputError("");
    }
  };

  const onClickAddGroupButton = () => {
    if (addGroupInputText !== "") {
      if (
        groups.filter((group: IGroup) => group.title === addGroupInputText)
          .length === 0
      ) {
        addGroup(addGroupInputText);
        setAddGroupInputText("");
      } else {
        setAddGroupInputError("Такая группа уже существует");
      }
    } else {
      setAddGroupInputError("Введите название группы");
    }
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
            onChange={onChangeAddGroupInputText}
            error={addGroupInputError}
          />
        </div>
      </div>

      <div className="right-bar__section">
        <div className="section__child">
          <ButtonComponent label="Добавить" onClick={onClickAddGroupButton} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  mainScreen: state.mainScreen,
  groups: state.groups,
});

const mapDispatchToProps = {
  changeSearchGroupName: (value: string) => changeSearchGroupNameAction(value),
  addGroup: (groupName: string) => addGroupAction(groupName),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MainRightBarComponent);
