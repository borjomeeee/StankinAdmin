import React, { useState } from "react";

import Search from "@material-ui/icons/Search";

import RightBarOptionTemplate from "../templates/RightBarOption.template";

import IconedInputComponent from "./IconedInput.component";
import LabeledInputComponent from "./LabeledInput.component";
import FilterSelectComponent from "./FilterSelect.component";

import { TypeLessonType } from "../utils/enums";

const GroupRightBar = () => {
  const [lessonTitle, setLessonTitle] = useState("");
  const [typeLessonData, setTypeLessonData] = useState({
    data: [TypeLessonType.LECTURE, TypeLessonType.LAB, TypeLessonType.SEMINAR],
    selected: TypeLessonType.LECTURE,
  });

  const handleChangeTypeLesson = (value: string) => {
    setTypeLessonData({ ...typeLessonData, selected: value as TypeLessonType });
  };

  return (
    <div className="right-bar">
      <RightBarOptionTemplate label="Найти пару">
        <IconedInputComponent
          label="Введите название пары"
          value={lessonTitle}
          onChange={setLessonTitle}
          icon={<Search style={{ fontSize: 24 }} />}
        />
      </RightBarOptionTemplate>
      <RightBarOptionTemplate label="Добавить пару">
        <LabeledInputComponent
          label="Название пары"
          value={lessonTitle}
          onChange={setLessonTitle}
        />
        <FilterSelectComponent
          itemSelected={typeLessonData.selected}
          selectData={typeLessonData.data}
          onChangeItem={handleChangeTypeLesson}
        />
      </RightBarOptionTemplate>
    </div>
  );
};

export default GroupRightBar;
