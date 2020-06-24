import React, { useState, useMemo } from "react";

import Search from "@material-ui/icons/Search";
import Room from "@material-ui/icons/Room";
import School from "@material-ui/icons/School";

import Button from "@material-ui/core/Button";

import IconedInputComponent from "./IconedInput.component";
import LabeledInputComponent from "./LabeledInput.component";
import FilterSelectComponent from "./FilterSelect.component";
import DateMiniCardComponent from "./DateMiniCard.component";
import ButtonComponent from "./Button.component";

import { TypeLessonType, TypeStudentGroup } from "../utils/enums";

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
  // States
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

  // Handlers
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

  // Icons
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
      <div className="right-bar__section">
        <div className="section__label">Найти пару</div>

        <div className="section__child">
          <IconedInputComponent
            label="Название пары"
            value={searchLessonTitle}
            onChange={setSearchLessonTitle}
            icon={searchLessonTitleIcon}
          />
        </div>
      </div>

      <div className="right-bar__section">
        <div className="section__label">Добавить пару</div>

        <div className="section__child">
          <div className="right-bar__section-row">
            <LabeledInputComponent
              label="Название пары"
              value={addLessonTitle}
              onChange={setAddLessonTitle}
            />

            <FilterSelectComponent
              itemSelected={studentGroupData.selected}
              selectData={studentGroupData.data}
              onChangeItem={handleChangeStudentGroup}
              label="Группа"
            />
          </div>
        </div>

        <div className="section__child">
          <FilterSelectComponent
            itemSelected={lessonTypeData.selected}
            selectData={lessonTypeData.data}
            onChangeItem={handleChangeLessonType}
            label="Тип пары"
          />
        </div>

        <div className="section__child">
          <FilterSelectComponent
            itemSelected={lessonTimeData.selected}
            selectData={lessonTimeData.data}
            onChangeItem={handleChangeLessonTime}
            label="Время"
          />
        </div>

        <div className="section__child">
          <IconedInputComponent
            label="Аудитория"
            value={roomLessonTitle}
            onChange={setRoomLessonTitle}
            icon={roomLessonTitleIcon}
          />
        </div>

        <div className="section__child">
          <IconedInputComponent
            label="Преподаватель"
            value={teacherLessonName}
            onChange={setTeacherLessonName}
            icon={teacherLessonNameIcon}
          />
        </div>

        <div className="section__child">
          <Button variant="outlined" fullWidth>
            Добавить дату
          </Button>
        </div>

        <div className="section__child">
          <div className="right-bar__section-row">
            <DatesCards />
          </div>
        </div>

        <div className="section__child">
          <ButtonComponent
            label="Добавить"
            onClick={() => console.log("Добавить пару!")}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupRightBar;
