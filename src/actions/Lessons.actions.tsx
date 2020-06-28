import {
  DOWNLOAD_LESSONS,
  DOWNLOAD_LESSONS_SUCCESS,
  DOWNLOAD_LESSONS_FAILED,
  IAction,
  CREATE_LESSON,
  CREATE_LESSON_SUCCESS,
  CREATE_LESSON_FAILED,
} from "../utils/constants";

import { LessonType, StudentGroupType } from "../utils/enums";

import { ILesson } from "../models/Lesson.model";
import { ILessonTime } from "../models/LessonTime.model";

export interface IDownloadLessonsSagaProps extends IAction {
  payload: { groupId: string };
}
export interface ICreateLessonSaga extends IAction {
  payload: {
    groupId: string;
    lessonTitle: string;
    studentGroupType: StudentGroupType;
    lessonType: LessonType;
    lessonDates: Date[];
    time: ILessonTime;
    lessonPlace: string;
    teacher: string;
  };
}

// Downloads
export const downloadLessonsAction = (groupId: string) =>
  ({
    type: DOWNLOAD_LESSONS,
    payload: { groupId },
  } as const);

export const downloadLessonsSuccessAction = (
  groupId: string,
  lessons: ILesson[]
) =>
  ({
    type: DOWNLOAD_LESSONS_SUCCESS,
    payload: { groupId, lessons },
  } as const);

export const downloadLessonsFailedAction = (error: string) =>
  ({
    type: DOWNLOAD_LESSONS_FAILED,
    payload: { error },
  } as const);

// Adding
export const createLessonAction = (
  groupId: string,
  lessonTitle: string,
  studentGroupType: StudentGroupType,
  lessonType: LessonType,
  lessonDates: Date[],
  time: ILessonTime,
  lessonPlace: string,
  teacher: string
) =>
  ({
    type: CREATE_LESSON,
    payload: {
      groupId,
      lessonTitle,
      studentGroupType,
      lessonType,
      lessonDates,
      time,
      lessonPlace,
      teacher,
    },
  } as const);

export const createLessonSuccessAction = (groupId: string, lesson: ILesson) =>
  ({
    type: CREATE_LESSON_SUCCESS,
    payload: { groupId, lesson },
  } as const);

export const createLessonFailedAction = (error: string) =>
  ({
    type: CREATE_LESSON_FAILED,
    payload: { error },
  } as const);
