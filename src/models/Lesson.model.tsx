import { TypeLessonType, TypeStudentGroup } from "../utils/enums";

import { ILessonTime } from "./LessonTime.model";

export interface ILesson {
  id: number;
  title: string;
  teacher: string;
  type: TypeLessonType;
  dates: Date[];
  time: ILessonTime;
  place: string;
  studentGroup: TypeStudentGroup;
  groupId: number;
}

export default class Lesson implements ILesson {
  id: number;
  title: string;
  teacher: string;
  type: TypeLessonType;
  dates: Date[];
  time: ILessonTime;
  place: string;
  studentGroup: TypeStudentGroup;
  groupId: number;

  constructor(
    id: number,
    title: string,
    teacher: string,
    type: TypeLessonType,
    dates: Date[],
    time: ILessonTime,
    place: string,
    studentGroup: TypeStudentGroup,
    groupId: number
  ) {
    this.id = id;
    this.title = title;
    this.teacher = teacher;
    this.type = type;
    this.dates = dates;
    this.time = time;
    this.place = place;
    this.studentGroup = studentGroup;
    this.groupId = groupId;
  }
}
