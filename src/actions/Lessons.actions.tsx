import {
  DOWNLOAD_LESSONS,
  DOWNLOAD_LESSONS_SUCCESS,
  DOWNLOAD_LESSONS_FAILED,
  IAction,
} from "../utils/constants";

import { ILesson } from "../models/Lesson.model";

export interface IDownloadLessonsSagaProps extends IAction {
  payload: { groupId: string };
}

export const downloadLessonsAction = (groupId: string) =>
  ({
    type: DOWNLOAD_LESSONS,
    payload: { groupId },
  } as const);

export const downloadLessonsSuccessAction = (
  groupId: string ,
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
