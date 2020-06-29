import { useState } from "react";

import { LessonType, StudentGroupType } from "../utils/enums";

import useDefaultInput from "./useDefaultInput.hook";

export const time = new Map<string, number>();
time.set("8:30 - 10:10", 1);
time.set("10:20 - 12:00", 2);
time.set("12:20 - 14:00", 3);
time.set("14:10 - 15:50", 4);
time.set("16:00 - 17:40", 5);
time.set("18:00 - 19:30", 6);
time.set("19:40 - 21:10", 7);
time.set("21:20 - 22:50", 8);

const useGroup = () => {
  const [lessonDates, setLessonDates] = useState<Date[]>([]);

  const [
    lessonTitle,
    lessonTitleError,
    handleChangeLessonTitle,
    checkValidLessonTitle,
  ] = useDefaultInput("");

  const [
    lessonRoom,
    lessonRoomError,
    handleChangeLessonRoom,
    checkValidLessonRoom,
  ] = useDefaultInput("");

  const [
    lessonTeacherName,
    lessonTeacherNameError,
    handleChangeLessonTeacherName,
    checkValidLessonTeacherName,
  ] = useDefaultInput("");

  const [lessonTypeData, setLessonTypeData] = useState({
    data: [LessonType.LECTURE, LessonType.LAB, LessonType.SEMINAR],
    selected: LessonType.LECTURE,
  });
  const [studentGroupData, setStudentGroupData] = useState({
    data: [StudentGroupType.NONE, StudentGroupType.A, StudentGroupType.B],
    selected: StudentGroupType.NONE,
  });

  const [lessonTimeData, setLessonTimeData] = useState({
    data: Array.from(time.keys()),
    selected: Array.from(time.keys())[0],
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

  return {
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
  };
};

export default useGroup;
