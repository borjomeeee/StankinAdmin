import {
  DOWNLOAD_LESSONS,
  DOWNLOAD_LESSONS_SUCCESS,
  DOWNLOAD_LESSONS_FAILED,
  IAction,
  CREATE_LESSON,
  CREATE_LESSON_SUCCESS,
  CREATE_LESSON_FAILED,
  REMOVE_LESSON,
  REMOVE_LESSON_SUCCESS,
  REMOVE_LESSON_FAILED,
  CHANGE_LESSON,
  CHANGE_LESSON_SUCCESS,
  CHANGE_LESSON_FAILED,
} from "../utils/constants";

import { LessonType, StudentGroupType } from "../utils/enums";

import { ILesson } from "../models/Lesson.model";
import { ILessonTime } from "../models/LessonTime.model";

export interface IDownloadLessonsSagaProps extends IAction {
  payload: { key: string; groupId: string };
}
export interface ICreateLessonSaga extends IAction {
  payload: {
    key: string;
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
export interface IRemoveLessonSaga extends IAction {
  payload: { key: string; groupId: string; lessonId: string };
}
export interface IChangeLessonSaga extends IAction {
  payload: { key: string; lesson: ILesson };
}

// Downloads
export const downloadLessonsAction = (key: string, groupId: string) =>
  ({
    type: DOWNLOAD_LESSONS,
    payload: { key, groupId },
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
  ({
    type: CREATE_LESSON,
    payload: {
      key,
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

// Remove
export const removeLessonAction = (key: string, groupId: string, lessonId: string) =>
  ({
    type: REMOVE_LESSON,
    payload: { key, groupId, lessonId },
  } as const);

export const removeLessonSuccessAction = (groupId: string, lessonId: string) =>
  ({
    type: REMOVE_LESSON_SUCCESS,
    paylaod: { groupId, lessonId },
  } as const);

export const removeLessonFailedAction = (error: string) =>
  ({
    type: REMOVE_LESSON_FAILED,
    payload: { error },
  } as const);

// Change
export const changeLessonAction = (key: string, lesson: ILesson) =>
  ({
    type: CHANGE_LESSON,
    payload: { key, lesson },
  } as const);

export const changeLessonSuccessAction = (lesson: ILesson) =>
  ({
    type: CHANGE_LESSON_SUCCESS,
    payload: { lesson },
  } as const);

export const changeLessonFailedAction = (error: string) =>
  ({
    type: CHANGE_LESSON_FAILED,
    payload: { error },
  } as const);
