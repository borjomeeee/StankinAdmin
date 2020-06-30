import { useState } from "react";

import { LessonType, StudentGroupType } from "../utils/enums";

import useDefaultInput from "./useDefaultInput.hook";

import { ILesson } from "../models/Lesson.model";

// Переделать возможность выбора времени пары
export const time = new Map<string, number>();
time.set("8:30 - 10:10", 1);
time.set("10:20 - 12:00", 2);
time.set("12:20 - 14:00", 3);
time.set("14:10 - 15:50", 4);
time.set("16:00 - 17:40", 5);
time.set("18:00 - 19:30", 6);
time.set("19:40 - 21:10", 7);
time.set("21:20 - 22:50", 8);

const useLesson = (lesson?: ILesson) => {
  const [lessonDates, setLessonDates] = useState<Date[]>(lesson?.dates || []);
  const [lessonDatesError, setLessonDatesError] = useState("");

  const checkValidLessonDates = (): boolean => {
    if (lessonDates.length === 0) {
      setLessonDatesError("Выберите хотя бы одну дату");
      return false;
    }
    return true;
  };

  const [
    lessonTitle,
    lessonTitleError,
    setLessonTitleError,
    handleChangeLessonTitle,
    checkValidLessonTitle,
  ] = useDefaultInput(lesson?.title || "");

  const [
    lessonRoom,
    lessonRoomError,
    setLessonRoomError,
    handleChangeLessonRoom,
    checkValidLessonRoom,
  ] = useDefaultInput(lesson?.place || "", false);

  const [
    lessonTeacherName,
    lessonTeacherNameError,
    setLessonTeacherNameError,
    handleChangeLessonTeacherName,
    checkValidLessonTeacherName,
  ] = useDefaultInput(lesson?.teacher || "", false);

  const [lessonTypeData, setLessonTypeData] = useState({
    data: [
      LessonType.NONE,
      LessonType.LECTURE,
      LessonType.LAB,
      LessonType.SEMINAR,
    ],
    selected: lesson?.type || LessonType.NONE,
  });
  const [studentGroupData, setStudentGroupData] = useState({
    data: [StudentGroupType.NONE, StudentGroupType.A, StudentGroupType.B],
    selected: lesson?.studentGroup || StudentGroupType.NONE,
  });

  const [lessonTimeData, setLessonTimeData] = useState({
    data: Array.from(time.keys()),
    selected: lesson
      ? `${lesson.time.startAt} - ${lesson.time.endAt}`
      : Array.from(time.keys())[0],
  });

  const handleChangeLessonType = (value: string) => {
    setLessonTypeData({ ...lessonTypeData, selected: value as LessonType });
  };

  const handleChangeStudentGroup = (value: string) => {
    setStudentGroupData({
      ...studentGroupData,
      selected: value as StudentGroupType,
    });
  };

  const handleChangeLessonTime = (value: string) => {
    setLessonTimeData({ ...lessonTimeData, selected: value });
  };

  const handleAddLessonDate = (date: Date) => {
    setLessonDates([...lessonDates, date]);
  };

  const handleRemoveLessonDate = (date: Date) => {
    setLessonDates(
      lessonDates.filter(
        (currDate: Date) =>
          currDate.toLocaleDateString() !== date.toLocaleDateString()
      )
    );
  };

  return {
    lessonTitle,
    lessonTitleError,
    setLessonTitleError,
    handleChangeLessonTitle,
    checkValidLessonTitle,

    lessonRoom,
    lessonRoomError,
    setLessonRoomError,
    handleChangeLessonRoom,
    checkValidLessonRoom,

    lessonTeacherName,
    lessonTeacherNameError,
    setLessonTeacherNameError,
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
  };
};

export default useLesson;
