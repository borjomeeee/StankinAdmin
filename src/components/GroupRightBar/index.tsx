import React, { useState, useMemo } from "react";
import { connect, ConnectedProps } from "react-redux";

import { IInitialState } from "../../redux/store";

import useLesson, { time } from "../../hooks/useLesson.hook";

import Search from "@material-ui/icons/Search";
import Room from "@material-ui/icons/Room";
import School from "@material-ui/icons/School";

import IconedInputComponent from "../IconedInput";
import LabeledInputComponent from "../LabeledInput";
import FilterSelectComponent from "../FilterSelect";
import DateMiniCardComponent from "../DateMiniCard";
import ButtonComponent from "../Button";

import { changeSearchLessonsNameAction } from "../../actions/GroupScreen.actions";
import { createLessonAction } from "../../actions/Lessons.actions";

import { IGroup } from "../../models/Group.model";
import { ILessonTime, LessonTime } from "../../models/LessonTime.model";

import { StudentGroupType, LessonType } from "../../utils/enums";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { checkLessonExist } from "../../utils";

import ModalTemplate from "../../templates/Modal";

type IGroupRightBar = {
  group: IGroup;
};

const GroupRightBar = ({
  app,
  group,
  groupScreen,
  lessons,
  changeSearhLessonName,
  createLesson,
}: ConnectedProps<typeof connector> & IGroupRightBar) => {
  // States
  const [searchLessonInputText, setSearchLessonInputText] = useState(
    groupScreen.searchLessonText
  );

  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [modalExistLessonVisible, setModalExistLessonVisible] = useState(false);

  const {
    lessonTitle,
    lessonTitleError,
    // setLessonTitleError,
    handleChangeLessonTitle,
    checkValidLessonTitle,

    lessonRoom,
    lessonRoomError,
    // setLessonRoomError,
    handleChangeLessonRoom,
    checkValidLessonRoom,

    lessonTeacherName,
    lessonTeacherNameError,
    // setLessonTeacherNameError,
    handleChangeLessonTeacherName,
    checkValidLessonTeacherName,

    lessonDates,
    lessonDatesError,
    setLessonDatesError,
    handleAddLessonDate,
    handleRemoveLessonDate,
    checkValidLessonDates,

    lessonTypeData,
    studentGroupData,
    lessonTimeData,

    handleChangeLessonType,
    handleChangeStudentGroup,
    handleChangeLessonTime,
  } = useLesson();

  const onSearchLessonInputEnter = () => {
    if (searchLessonInputText !== groupScreen.searchLessonText)
      changeSearhLessonName(searchLessonInputText);
  };

  const onAddLessonDate = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      handleAddLessonDate(date);

      if (lessonDatesError) {
        setLessonDatesError("");
      }
    }
  };

  const onAddLesson = () => {
    const lessonTime = time.get(lessonTimeData.selected);
    if (
      lessonTime &&
      checkValidLessonTitle() &&
      checkValidLessonRoom() &&
      checkValidLessonTeacherName() &&
      checkValidLessonDates()
    ) {
      if (
        !checkLessonExist(
          lessons.get(group.id) || [],
          lessonTitle,
          studentGroupData.selected,
          lessonTypeData.selected,
          new LessonTime(lessonTime),
          lessonRoom,
          lessonTeacherName
        )
      ) {
        createLesson(
          app.appKey,
          group.id,
          lessonTitle,
          studentGroupData.selected,
          lessonTypeData.selected,
          lessonDates,
          new LessonTime(lessonTime),
          lessonRoom,
          lessonTeacherName
        );
      } else {
        setModalExistLessonVisible(true);
      }
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
        <DateMiniCardComponent
          key={index}
          date={item}
          onRemove={handleRemoveLessonDate.bind(null, item)}
        />
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
            {lessonDatesError === "" ? (
              <DatesCards />
            ) : (
              <div className="error-message">{lessonDatesError}</div>
            )}
          </div>
        </div>

        <div className="section__child">
          <ButtonComponent label="Добавить" onClick={onAddLesson} />
        </div>

        {modalExistLessonVisible && (
          <ModalTemplate
            onClose={setModalExistLessonVisible.bind(null, false)}
            title="Предупреждение"
          >
            <div className="modal__text">Такая пара уже существует!</div>
          </ModalTemplate>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
  groupScreen: state.groupScreen,
  lessons: state.lessons,
});

const mapDispatchToProps = {
  changeSearhLessonName: (value: string) =>
    changeSearchLessonsNameAction(value),
  createLesson: (
    key: string,
    groupId: string,
    lessonTitle: string,
    studentGroupType: StudentGroupType,
    lessonType: LessonType,
    lessonDates: Date[],
    time: ILessonTime,
    lessonPlace: string,
    teacher: string
  ) =>
    createLessonAction(
      key,
      groupId,
      lessonTitle,
      studentGroupType,
      lessonType,
      lessonDates,
      time,
      lessonPlace,
      teacher
    ),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(GroupRightBar);
