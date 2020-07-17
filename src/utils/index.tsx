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
  lessonTeacher: string
): boolean => {
  const numSameLessons = lessons.filter(
    (item: ILesson) =>
      item.title === lessonTitle &&
      item.studentGroup === lessonStudentGroup &&
      item.type === lessonType &&
      JSON.stringify(item.time) === JSON.stringify(lessonTime) &&
      item.place === lessonRoom &&
      item.teacher === lessonTeacher
  ).length;

  return numSameLessons !== 0;
};

export const getDatesFromString = (dates: string) => {
  return dates.split(",").map((dt: string) => {
    const [day, month] = dt.split("/");

    return new Date(new Date(Date.now()).getFullYear(), +month - 1, +day);
  });
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
