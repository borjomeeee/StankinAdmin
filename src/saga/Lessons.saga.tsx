import { takeEvery, delay, put } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";

import {
  DOWNLOAD_LESSONS,
  CREATE_LESSON,
  REMOVE_LESSON,
  CHANGE_LESSON,
} from "../utils/constants";

import {
  IDownloadLessonsSagaProps,
  downloadLessonsSuccessAction,
  downloadLessonsFailedAction,
  ICreateLessonSaga,
  createLessonSuccessAction,
  createLessonFailedAction,
  IRemoveLessonSaga,
  removeLessonSuccessAction,
  removeLessonFailedAction,
  IChangeLessonSaga,
  changeLessonSuccessAction,
  changeLessonFailedAction,
} from "../actions/Lessons.actions";
import { checkAdminKeyFailedAction } from "../actions/App.actions";

import {
  getDatesFromString,
  getLessonTypeFromString,
  getStudentGroupFromString,
  getStringFromLessonType,
  getStringFromStudentGroup,
  getStringFromDates,
} from "../utils";

import Lesson, { ILesson } from "../models/Lesson.model";
import { LessonTime } from "../models/LessonTime.model";

export function* downloadLessonsSaga({ payload }: IDownloadLessonsSagaProps) {
  try {
    const res = yield fetch(
      `http://localhost:5000/api/admin/load-lessons/${payload.groupId}`,
      {
        method: "POST",
        body: JSON.stringify({ key: payload.key }),
      }
    );

    if (res.status === 200) {
      const lessons = yield res.json();

      const validLessons = lessons.map((lesson: any) => {
        const lessonType = getLessonTypeFromString(lesson["type"]);
        const lessonDates = getDatesFromString(lesson["dates"]);
        const lessonTime = new LessonTime(lesson["num"]);
        const lessonStudentGroup = getStudentGroupFromString(
          lesson["user_group"]
        );

        return new Lesson(
          lesson["_id"],
          lesson["title"],
          lesson["teacher"],
          lessonType,
          lessonDates,
          lessonTime,
          lesson["room"],
          lessonStudentGroup,
          lesson["group_id"]
        );
      });

      yield put(downloadLessonsSuccessAction(payload.groupId, validLessons));
    } else if (res.status === 401) {
      const err = yield res.json();
      checkAdminKeyFailedAction(err["err"]);
    } else {
      const err = yield res.json();
      yield put(downloadLessonsFailedAction(err["err"]));
    }
  } catch (e) {
    yield put(downloadLessonsFailedAction("Ошибка при скачивании пар"));
  }
}

export function* createLessonSaga({ payload }: ICreateLessonSaga) {
  try {
    const lesson = {
      title: payload.lessonTitle,
      type: getStringFromLessonType(payload.lessonType),
      user_group: getStringFromStudentGroup(payload.studentGroupType),
      room: payload.lessonPlace,
      teacher: payload.teacher,
      dates: getStringFromDates(payload.lessonDates),
      num: payload.time.num,
      group_id: payload.groupId,
    };

    const res = yield fetch(`http://localhost:5000/api/admin/create-lesson`, {
      method: "POST",
      body: JSON.stringify({ key: payload.key, lesson }),
    });

    if (res.status === 200) {
      const lessonId = yield res.json();

      let newLesson: ILesson = new Lesson(
        lessonId["lesson_id"],
        payload.lessonTitle,
        payload.teacher,
        payload.lessonType,
        payload.lessonDates,
        payload.time,
        payload.lessonPlace,
        payload.studentGroupType,
        payload.groupId
      );
      yield put(createLessonSuccessAction(payload.groupId, newLesson));
    } else if (res.status === 401) {
      const err = yield res.json();
      checkAdminKeyFailedAction(err["err"]);
    } else {
      const err = yield res.json();
      yield put(createLessonFailedAction(err["err"]));
    }
  } catch (e) {
    yield put(createLessonFailedAction("Ошибка создания пары"));
  }
}

export function* removeLessonSaga({ payload }: IRemoveLessonSaga) {
  try {
    const res = yield fetch(
      `http://localhost:5000/api/admin/remove-lesson/${payload.lessonId}`,
      {
        method: "POST",
        body: JSON.stringify({ key: payload.key }),
      }
    );

    if (res.status === 200) {
      yield put(removeLessonSuccessAction(payload.groupId, payload.lessonId));
    } else if (res.status === 401) {
      const err = yield res.json();
      checkAdminKeyFailedAction(err["err"]);
    } else {
      const err = yield res.json();
      yield put(removeLessonFailedAction(err["err"]));
    }
  } catch (e) {
    yield put(removeLessonFailedAction("Ошибка удаления пары"));
  }
}

export function* changeLessonSaga({ payload }: IChangeLessonSaga) {
  try {
    yield delay(1000);
    // SEND DATA TO SERVER AND GET STATUS ANSWER

    let ok = true;
    let message = "Ошибка изменения пары";

    if (ok) {
      yield put(changeLessonSuccessAction(payload.lesson));
    } else {
      yield put(changeLessonFailedAction(message));
    }
  } catch (e) {
    yield put(changeLessonFailedAction("Ошибка изменения пары"));
  }
}

export default function* lessonsSaga() {
  yield takeEvery(DOWNLOAD_LESSONS, downloadLessonsSaga);
  yield takeEvery(CREATE_LESSON, createLessonSaga);
  yield takeEvery(REMOVE_LESSON, removeLessonSaga);
  yield takeEvery(CHANGE_LESSON, changeLessonSaga);
}
