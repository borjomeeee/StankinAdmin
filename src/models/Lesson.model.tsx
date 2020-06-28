import { LessonType, StudentGroupType } from "../utils/enums";

import { ILessonTime } from "./LessonTime.model";

export interface ILesson {
  id: string;
  title: string;
  teacher: string;
  type: LessonType;
  dates: Date[];
  time: ILessonTime;
  place: string;
  studentGroup: StudentGroupType;
  groupId: string;
}

export default class Lesson implements ILesson {
  id: string;
  title: string;
  teacher: string;
  type: LessonType;
  dates: Date[];
  time: ILessonTime;
  place: string;
  studentGroup: StudentGroupType;
  groupId: string;

  constructor(
    id: string,
    title: string,
    teacher: string,
    type: LessonType,
    dates: Date[],
    time: ILessonTime,
    place: string,
    studentGroup: StudentGroupType,
    groupId: string
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
