import { takeEvery, delay, put } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";

import { DOWNLOAD_LESSONS } from "../utils/constants";

import {
  IDownloadLessonsSagaProps,
  downloadLessonsSuccessAction,
  downloadLessonsFailedAction,
  ICreateLessonSaga,
  createLessonSuccessAction,
  createLessonFailedAction,
} from "../actions/Lessons.actions";

import { LessonType, StudentGroupType } from "../utils/enums";

import Lesson, { ILesson } from "../models/Lesson.model";
import { LessonTime } from "../models/LessonTime.model";

export function* downloadLessonsSaga({ payload }: IDownloadLessonsSagaProps) {
  try {
    yield delay(1000);
    // DOWNLOAD LESSONS FROM SERVER
    let ok = true;
    let message = "Ошибка при скачивании пар";

    let lessons = [
      new Lesson(
        uuidv4(),
        "Технологии программирования",
        "Иванов Иван Иванович",
        LessonType.LECTURE,
        [new Date(2020, 6, 23), new Date(2020, 6, 22), new Date(2020, 6, 21)],
        new LessonTime(1),
        "0101",
        StudentGroupType.NONE,
        payload.groupId
      ),
      new Lesson(
        uuidv4(),
        "Политология",
        "Саркисова Валерия Петровна",
        LessonType.LAB,
        [new Date(2020, 5, 23), new Date(2020, 5, 22), new Date(2020, 5, 21)],
        new LessonTime(2),
        "0101",
        StudentGroupType.A,
        payload.groupId
      ),
      new Lesson(
        uuidv4(),
        "Архитектура ЭВМ",
        "Мурашкин Денис Дмитриевич",
        LessonType.SEMINAR,
        [new Date(2020, 6, 1), new Date(2020, 6, 2), new Date(2020, 6, 3)],
        new LessonTime(3),
        "0101",
        StudentGroupType.B,
        payload.groupId
      ),
    ];

    if (ok) {
      yield put(downloadLessonsSuccessAction(payload.groupId, lessons));
    } else {
      yield put(downloadLessonsFailedAction(message));
    }
  } catch (e) {
    yield put(downloadLessonsFailedAction("Ошибка при скачивании пар"));
  }
}

export function* createLessonSaga({ payload }: ICreateLessonSaga) {
  try {
    yield delay(1000);
    // SEND DATA ABOUT LESSON TO SERVER AND GET NEW LESSON OBJECT OR ERROR

    let ok = true;
    let message = "Ошибка создания пары";

    let lesson: ILesson = new Lesson(
      uuidv4(),
      payload.lessonTitle,
      payload.teacher,
      payload.lessonType,
      payload.lessonDates,
      payload.time,
      payload.lessonPlace,
      payload.studentGroupType,
      payload.groupId
    );

    if (ok) {
      yield put(createLessonSuccessAction(payload.groupId, lesson));
    } else {
      yield put(createLessonFailedAction(message));
    }
  } catch (e) {
    yield put(createLessonFailedAction("Ошибка создания пары"));
  }
}

export default function* lessonsSaga() {
  yield takeEvery(DOWNLOAD_LESSONS, downloadLessonsSaga);
}
