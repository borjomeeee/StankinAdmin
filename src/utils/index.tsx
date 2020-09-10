import { ILesson } from "../models/Lesson.model";
import { StudentGroupType, LessonType } from "./enums";
import { LessonTime } from "../models/LessonTime.model";

export const checkLessonExist = (
  lessons: ILesson[],
  lessonTitle: string,
  lessonStudentGroup: StudentGroupType,
  lessonType: LessonType,
  lessonTime: LessonTime,
  lessonRoom: string,
  lessonTeacher: string,
  lessonDates: Date[]
): boolean => {
  const numSameLessons = lessons.filter(
    (item: ILesson) =>
      item.title === lessonTitle &&
      item.studentGroup === lessonStudentGroup &&
      item.type === lessonType &&
      JSON.stringify(item.time) === JSON.stringify(lessonTime) &&
      item.place === lessonRoom &&
      item.teacher === lessonTeacher &&
      JSON.stringify(item.dates) === JSON.stringify(lessonDates)
  ).length;

  return numSameLessons !== 0;
};

export const getDatesFromString = (dates: string) => {
  return dates.split(",").map((dt: string) => {
    const [day, month] = dt.split("/");

    return new Date(new Date(Date.now()).getFullYear(), +month - 1, +day);
  });
};

export const getStringFromDates = (dates: Date[]) => {
  return dates
    .map((date: Date) => {
      const day = date.getDate().toString();
      const month = (date.getMonth() + 1).toString();

      return `${day.length === 1 ? "0" : ""}${day}/${
        month.length === 1 ? "0" : ""
      }${month}`;
    })
    .join(",");
};

export const checkValueInEnum = <T, G>(value: T, enumArr: G) => {
  return (Object.values(enumArr) as T[]).includes(value);
};

export const getLessonTypeFromString = (type: string) => {
  type = type.toLowerCase();
  switch (type) {
    case "лекции":
      return LessonType.LECTURE;
    case "лабораторные занятия":
      return LessonType.LAB;
    case "семинар":
      return LessonType.SEMINAR;
    default:
      return LessonType.NONE;
  }
};

export const getStringFromLessonType = (type: LessonType) => {
  switch (type) {
    case LessonType.LECTURE:
      return "лекции";
    case LessonType.LAB:
      return "лабораторные занятия";
    case LessonType.SEMINAR:
      return "семинар";
    case LessonType.NONE:
      return "";
    default:
      throw new Error();
  }
};

export const getStudentGroupFromString = (studentGroup: string) => {
  studentGroup = studentGroup.toUpperCase();
  switch (studentGroup) {
    case "А":
      return StudentGroupType.A;
    case "Б":
      return StudentGroupType.B;
    default:
      return StudentGroupType.NONE;
  }
};

export const getStringFromStudentGroup = (studentGroup: StudentGroupType) => {
  switch (studentGroup) {
    case StudentGroupType.A:
      return "А";
    case StudentGroupType.B:
      return "Б";
    case StudentGroupType.NONE:
      return "";
    default:
      throw new Error();
  }
};
