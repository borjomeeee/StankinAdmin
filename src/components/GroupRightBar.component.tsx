import React, { useState, useMemo } from "react";

import Search from "@material-ui/icons/Search";
import Room from "@material-ui/icons/Room";
import School from "@material-ui/icons/School";

import Button from "@material-ui/core/Button";

import RightBarOptionTemplate from "../templates/RightBarOption.template";

import IconedInputComponent from "./IconedInput.component";
import LabeledInputComponent from "./LabeledInput.component";
import FilterSelectComponent from "./FilterSelect.component";

import { TypeLessonType, TypeStudentGroup } from "../utils/enums";
import DateMiniCardComponent from "./DateMiniCard.component";
import ButtonComponent from "./Button.component";

const time = new Map<string, number>();
time.set("8:30 - 10:10", 1);
time.set("10:20 - 12:00", 2);
time.set("12:20 - 14:00", 3);
time.set("14:10 - 15:50", 4);
time.set("16:00 - 17:40", 5);
time.set("18:00 - 19:30", 6);
time.set("19:40 - 21:10", 7);
time.set("21:20 - 22:50", 8);

const dates = [
  new Date(2020, 10, 10),
  new Date(2020, 10, 11),
  new Date(2020, 10, 12),
];

const GroupRightBar = () => {
  const [searchLessonTitle, setSearchLessonTitle] = useState("");
  const [addLessonTitle, setAddLessonTitle] = useState("");
  const [roomLessonTitle, setRoomLessonTitle] = useState("");
  const [teacherLessonName, setTeacherLessonName] = useState("");

  const [lessonTypeData, setLessonTypeData] = useState({
    data: [TypeLessonType.LECTURE, TypeLessonType.LAB, TypeLessonType.SEMINAR],
    selected: TypeLessonType.LECTURE,
  });
  const [studentGroupData, setStudentGroupData] = useState({
    data: [TypeStudentGroup.NONE, TypeStudentGroup.A, TypeStudentGroup.B],
    selected: TypeStudentGroup.NONE,
  });

  const [lessonTimeData, setLessonTimeData] = useState({
    data: Array.from(time.keys()),
    selected: Array.from(time.keys())[0],
  });

  const handleChangeLessonType = (value: string) => {
    setLessonTypeData({ ...lessonTypeData, selected: value as TypeLessonType });
  };

  const handleChangeStudentGroup = (value: string) => {
    setStudentGroupData({
      ...studentGroupData,
      selected: value as TypeStudentGroup,
    });
  };

  const handleChangeLessonTime = (value: string) => {
    setLessonTimeData({ ...lessonTimeData, selected: value });
  };

  // ICONS
  const searchLessonTitleIcon = useMemo(() => {
    return <Search style={{ fontSize: 24 }} />;
  }, []);

  const roomLessonTitleIcon = useMemo(() => {
    return <Room style={{ fontSize: 24 }} />;
  }, []);

  const teacherLessonNameIcon = useMemo(() => {
    return <School style={{ fontSize: 24 }} />;
  }, []);

  const DatesCards = () => (
    <>
      {dates.map((item: Date, index: number) => (
        <DateMiniCardComponent key={index} date={item} />
      ))}
    </>
  );

  return (
    <div className="right-bar">
      <RightBarOptionTemplate label="Найти пару">
        <IconedInputComponent
          label="Название пары"
          value={searchLessonTitle}
          onChange={setSearchLessonTitle}
          icon={searchLessonTitleIcon}
        />
      </RightBarOptionTemplate>

      <RightBarOptionTemplate label="Добавить пару">
        <div className="right-bar__option-row">
          <LabeledInputComponent
            label="Название пары"
            value={addLessonTitle}
            onChange={setAddLessonTitle}
          />
          <FilterSelectComponent
            itemSelected={studentGroupData.selected}
            selectData={studentGroupData.data}
            onChangeItem={handleChangeStudentGroup}
          />
        </div>
      </RightBarOptionTemplate>

      <RightBarOptionTemplate>
        <FilterSelectComponent
          itemSelected={lessonTypeData.selected}
          selectData={lessonTypeData.data}
          onChangeItem={handleChangeLessonType}
        />
      </RightBarOptionTemplate>

      <RightBarOptionTemplate>
        <FilterSelectComponent
          itemSelected={lessonTimeData.selected}
          selectData={lessonTimeData.data}
          onChangeItem={handleChangeLessonTime}
        />
      </RightBarOptionTemplate>

      <RightBarOptionTemplate>
        <IconedInputComponent
          label="Аудитория"
          value={roomLessonTitle}
          onChange={setRoomLessonTitle}
          icon={roomLessonTitleIcon}
        />
      </RightBarOptionTemplate>

      <RightBarOptionTemplate>
        <IconedInputComponent
          label="Преподаватель"
          value={teacherLessonName}
          onChange={setTeacherLessonName}
          icon={teacherLessonNameIcon}
        />
      </RightBarOptionTemplate>

      <RightBarOptionTemplate>
        <Button variant="outlined" fullWidth>
          Добавить дату
        </Button>
      </RightBarOptionTemplate>

      <RightBarOptionTemplate>
        <div className="right-bar__option-row">
          <DatesCards />
        </div>
      </RightBarOptionTemplate>

      <RightBarOptionTemplate>
        <ButtonComponent
          label="Добавить"
          onClick={() => console.log("Добавить пару!")}
        />
      </RightBarOptionTemplate>
    </div>
  );
};

export default GroupRightBar;
