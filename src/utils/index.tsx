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
