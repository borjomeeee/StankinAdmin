import React, { useState, useMemo } from "react";
import { connect, ConnectedProps } from "react-redux";

import { IInitialState } from "../redux/store";

import Search from "@material-ui/icons/Search";
import Room from "@material-ui/icons/Room";
import School from "@material-ui/icons/School";

import IconedInputComponent from "./IconedInput.component";
import LabeledInputComponent from "./LabeledInput.component";
import FilterSelectComponent from "./FilterSelect.component";
import DateMiniCardComponent from "./DateMiniCard.component";
import ButtonComponent from "./Button.component";

import { changeSearchLessonsNameAction } from "../actions/GroupScreen.actions";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import useGroup from "../hooks/useGroup.hook";

const time = new Map<string, number>();
time.set("8:30 - 10:10", 1);
time.set("10:20 - 12:00", 2);
time.set("12:20 - 14:00", 3);
time.set("14:10 - 15:50", 4);
time.set("16:00 - 17:40", 5);
time.set("18:00 - 19:30", 6);
time.set("19:40 - 21:10", 7);
time.set("21:20 - 22:50", 8);

const GroupRightBar = ({
  groupScreen,
  changeSearhLessonName,
}: ConnectedProps<typeof connector>) => {
  // States
  const [searchLessonInputText, setSearchLessonInputText] = useState(
    groupScreen.searchLessonText
  );

  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));

  const {
    lessonTitle,
    lessonTitleError,
    handleChangeLessonTitle,
    checkValidLessonTitle,

    lessonRoom,
    lessonRoomError,
    handleChangeLessonRoom,
    checkValidLessonRoom,

    lessonTeacherName,
    lessonTeacherNameError,
    handleChangeLessonTeacherName,
    checkValidLessonTeacherName,

    lessonDates,
    lessonTypeData,
    studentGroupData,
    lessonTimeData,

    handleChangeLessonType,
    handleChangeStudentGroup,
    handleChangeLessonTime,
    handleAddLessonDate,
  } = useGroup();

  const onSearchLessonInputEnter = () => {
    if (searchLessonInputText !== groupScreen.searchLessonText)
      changeSearhLessonName(searchLessonInputText);
  };

  const onAddLessonDate = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      handleAddLessonDate(date);
    }
  };

  const onAddLesson = () => {
    if (
      checkValidLessonTitle() &&
      checkValidLessonRoom() &&
      checkValidLessonTeacherName()
    ) {
      console.log("Добавление группы");
    }
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
      {lessonDates.map((item: Date, index: number) => (
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
            value={searchLessonInputText}
            onChange={setSearchLessonInputText}
            onEnter={onSearchLessonInputEnter}
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
              value={lessonTitle}
              onChange={handleChangeLessonTitle}
              error={lessonTitleError}
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
            value={lessonRoom}
            onChange={handleChangeLessonRoom}
            icon={roomLessonTitleIcon}
            error={lessonRoomError}
          />
        </div>

        <div className="section__child">
          <IconedInputComponent
            label="Преподаватель"
            value={lessonTeacherName}
            onChange={handleChangeLessonTeacherName}
            icon={teacherLessonNameIcon}
            error={lessonTeacherNameError}
          />
        </div>

        <div className="section__child">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Выберите дату"
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={onAddLessonDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </div>

        <div className="section__child">
          <div className="right-bar__section-row">
            <DatesCards />
          </div>
        </div>

        <div className="section__child">
          <ButtonComponent label="Добавить" onClick={onAddLesson} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  groupScreen: state.groupScreen,
});

const mapDispatchToProps = {
  changeSearhLessonName: (value: string) =>
    changeSearchLessonsNameAction(value),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(GroupRightBar);
