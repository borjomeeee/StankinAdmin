import React, { useMemo, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import { IInitialState } from "../../redux/store";

import { ILesson } from "../../models/Lesson.model";
import { LessonTime } from "../../models/LessonTime.model";

import useLesson, { time } from "../../hooks/useLesson.hook";

import LabeledInputComponent from "../LabeledInput";
import FilterSelectComponent from "../FilterSelect";
import IconedInputComponent from "../IconedInput";
import DateMiniCardComponent from "../DateMiniCard";
import ButtonComponent from "../Button";

import Room from "@material-ui/icons/Room";
import School from "@material-ui/icons/School";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { checkLessonExist } from "../../utils";

import { changeLessonAction } from "../../actions/Lessons.actions";

type IEditLessonModalComponent = {
  lesson: ILesson;
  onSubmit: () => void;
};

const EditLessonModalComponent = ({
  app,
  lesson,
  lessons,
  onSubmit,
  editLesson,
}: ConnectedProps<typeof connector> & IEditLessonModalComponent) => {
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [isErrorEdit, setIsErrorEdit] = useState(false);

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
  } = useLesson(lesson);

  // Handlers
  const onAddLessonDate = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      handleAddLessonDate(date);

      if (lessonDatesError) {
        setLessonDatesError("");
      }
    }
  };

  const onSaveLesson = () => {
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
          (lessons.get(lesson.groupId) || []).filter(
            (item: ILesson) => item.id !== lesson.id
          ),
          lessonTitle,
          studentGroupData.selected,
          lessonTypeData.selected,
          new LessonTime(lessonTime),
          lessonRoom,
          lessonTeacherName
        )
      ) {
        editLesson(app.appKey, {
          ...lesson,
          title: lessonTitle,
          studentGroup: studentGroupData.selected,
          type: lessonTypeData.selected,
          time: new LessonTime(lessonTime),
          place: lessonRoom,
          teacher: lessonTeacherName,
          dates: lessonDates,
        });
        onSubmit();
      } else {
        setIsErrorEdit(true);
      }
    }
  };

  // Icons
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

  if (isErrorEdit)
    return <div className="modal-text">Такая пара уже существует!</div>;

  return (
    <div className="modal__edit-lesson">
      <div className="edit-lesson__section-row">
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

      <div className="edit-lesson__section">
        <FilterSelectComponent
          itemSelected={lessonTypeData.selected}
          selectData={lessonTypeData.data}
          onChangeItem={handleChangeLessonType}
          label="Тип пары"
        />
      </div>

      <div className="edit-lesson__section">
        <FilterSelectComponent
          itemSelected={lessonTimeData.selected}
          selectData={lessonTimeData.data}
          onChangeItem={handleChangeLessonTime}
          label="Время"
        />
      </div>

      <div className="edit-lesson__section">
        <IconedInputComponent
          label="Аудитория"
          value={lessonRoom}
          onChange={handleChangeLessonRoom}
          icon={roomLessonTitleIcon}
          error={lessonRoomError}
        />
      </div>

      <div className="edit-lesson__section">
        <IconedInputComponent
          label="Преподаватель"
          value={lessonTeacherName}
          onChange={handleChangeLessonTeacherName}
          icon={teacherLessonNameIcon}
          error={lessonTeacherNameError}
        />
      </div>

      <div className="edit-lesson__section">
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

      <div className="edit-lesson__section-dates">
        {lessonDatesError === "" ? (
          <DatesCards />
        ) : (
          <div className="error-message">{lessonDatesError}</div>
        )}
      </div>

      <div className="edit-lesson__section">
        <ButtonComponent label="Сохранить" onClick={onSaveLesson} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
  lessons: state.lessons,
});

const mapDispatchToProps = {
  editLesson: (key: string, lesson: ILesson) => changeLessonAction(key, lesson),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(EditLessonModalComponent);
