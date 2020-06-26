import { takeEvery, delay, put } from "redux-saga/effects";

import { DOWNLOAD_LESSONS } from "../utils/constants";

import {
  IDownloadLessonsSagaProps,
  downloadLessonsSuccessAction,
  downloadLessonsFailedAction,
} from "../actions/Lessons.actions";

import { TypeLessonType, TypeStudentGroup } from "../utils/enums";

import Lesson from "../models/Lesson.model";
import { LessonTime } from "../models/LessonTime.model";

export function* downloadLessonsSaga({ payload }: IDownloadLessonsSagaProps) {
  try {
    yield delay(1000);
    // DOWNLOAD LESSONS FROM SERVER
    let ok = true;
    let message = "Ошибка при скачивании пар";

    let lessons = [
      new Lesson(
        1,
        "Технологии программирования",
        "Иванов Иван Иванович",
        TypeLessonType.LECTURE,
        [new Date(2020, 6, 23), new Date(2020, 6, 22), new Date(2020, 6, 21)],
        new LessonTime(1),
        "0101",
        TypeStudentGroup.NONE,
        1
      ),
      new Lesson(
        2,
        "Политология",
        "Саркисова Валерия Петровна",
        TypeLessonType.LAB,
        [new Date(2020, 5, 23), new Date(2020, 5, 22), new Date(2020, 5, 21)],
        new LessonTime(2),
        "0101",
        TypeStudentGroup.A,
        1
      ),
      new Lesson(
        3,
        "Архитектура ЭВМ",
        "Мурашкин Денис Дмитриевич",
        TypeLessonType.SEMINAR,
        [new Date(2020, 6, 1), new Date(2020, 6, 2), new Date(2020, 6, 3)],
        new LessonTime(3),
        "0101",
        TypeStudentGroup.B,
        1
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

export default function* lessonsSaga() {
  yield takeEvery(DOWNLOAD_LESSONS, downloadLessonsSaga);
}
