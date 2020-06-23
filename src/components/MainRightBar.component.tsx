import React, { useState } from "react";

import RightBarOptionTemplate from "../templates/RightBarOption.template";

import IconedInputComponent from "./IconedInput.component";
import LabeledInputComponent from "./LabeledInput.component";
import ButtonComponent from "./Button.component";

const MainRightBarComponent = () => {
  const [nameGroup, setNameGroup] = useState("");

  return (
    <div className="right-bar">
      <RightBarOptionTemplate label="Найти группу">
        <IconedInputComponent
          label="Введите название группы"
          value={nameGroup}
          onChange={setNameGroup}
        />
      </RightBarOptionTemplate>
      <RightBarOptionTemplate label="Добавить группу">
        <LabeledInputComponent
          label="Введите название группы"
          value={nameGroup}
          onChange={setNameGroup}
        />
      </RightBarOptionTemplate>

      <div className="right-bar__button">
        <ButtonComponent
          label="Добавить"
          onClick={() => console.log("Добавить группу!")}
        />
      </div>
    </div>
  );
};

export default MainRightBarComponent;
