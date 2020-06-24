import React, { useState, useMemo } from "react";

import Search from "@material-ui/icons/Search";

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
      <div className="right-bar__section">
        <div className="section__label">Найти группу</div>

        <div className="section__child">
          <IconedInputComponent
            label="Название группы"
            value={searchGroupInputText}
            onChange={setSearchGroupInputText}
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

export default MainRightBarComponent;
