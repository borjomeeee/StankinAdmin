import React, { useState, useMemo } from "react";

import Search from "@material-ui/icons/Search";

import RightBarOptionTemplate from "../templates/RightBarOption.template";

import IconedInputComponent from "./IconedInput.component";
import LabeledInputComponent from "./LabeledInput.component";
import ButtonComponent from "./Button.component";

const MainRightBarComponent = () => {
  const [searchGroupInputText, setSearchGroupInputText] = useState("");
  const [addGroupInputText, setAddGroupInputText] = useState("");

    // ICONS
    const searchGroupTitleIcon = useMemo(() => {
      return <Search style={{ fontSize: 24 }} />;
    }, []);

  return (
    <div className="right-bar">
      <RightBarOptionTemplate label="Найти группу">
        <IconedInputComponent
          label="Название группы"
          value={searchGroupInputText}
          onChange={setSearchGroupInputText}
          icon={searchGroupTitleIcon}
        />
      </RightBarOptionTemplate>

      <RightBarOptionTemplate label="Добавить группу">
        <LabeledInputComponent
          label="Название группы"
          value={addGroupInputText}
          onChange={setAddGroupInputText}
        />
      </RightBarOptionTemplate>

      <RightBarOptionTemplate>
        <ButtonComponent
          label="Добавить"
          onClick={() => console.log("Добавить группу!")}
        />
      </RightBarOptionTemplate>
    </div>
  );
};

export default MainRightBarComponent;
