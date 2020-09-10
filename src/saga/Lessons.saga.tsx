import { takeEvery, put } from "redux-saga/effects";

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
  getLessonTypeFromString,
  getStudentGroupFromString,
  getStringFromLessonType,
  getStringFromStudentGroup,
} from "../utils";

import Lesson, { ILesson } from "../models/Lesson.model";
import { LessonTime } from "../models/LessonTime.model";
import { fetchAPI } from "./Root.saga";

export function* downloadLessonsSaga({ payload }: IDownloadLessonsSagaProps) {
  try {
    const { status, data } = yield fetchAPI(
      `/api/admin/load-lessons/${payload.groupId}`,
      payload.key
    );

    if (status === 200) {
      if (Array.isArray(data)) {
        // console.log(data[0]["dates"].map((item: any) => new Date()));
        const validLessons = data.map((lesson: any) => {
          const lessonType = getLessonTypeFromString(lesson["type"]);
          const lessonDates = lesson["dates"].map((item: number) => new Date(item * 1000));
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
      } else {
        yield put(
          downloadLessonsFailedAction(
            "[SAGA ERROR] - downloadLessonsSaga: Данные пришли не в виде массива"
          )
        );
      }
    } else if (status === 401) {
      yield put(checkAdminKeyFailedAction(data["err"]));
    } else {
      yield put(downloadLessonsFailedAction(data["err"]));
    }
  } catch (e) {
    console.error(e);
    yield put(
      downloadLessonsFailedAction(
        "[SAGA ERROR] - downloadLessonsSaga: Ошибка в саге"
      )
    );
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
      dates: payload.lessonDates.map((date: Date) => date.getTime()),
      num: payload.time.num,
      group_id: payload.groupId,
    };

    const { status, data } = yield fetchAPI(
      `/api/admin/create-lesson`,
      payload.key,
      { lesson }
    );

    if (status === 200) {
      let newLesson: ILesson = new Lesson(
        data["lesson_id"],
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
    } else if (status === 401) {
      yield put(checkAdminKeyFailedAction(data["err"]));
    } else {
      yield put(createLessonFailedAction(data["err"]));
    }
  } catch (e) {
    console.error(e);
    yield put(
      createLessonFailedAction("[SAGA ERROR] - createLessonSaga: Ошибка в саге")
    );
  }
}

export function* removeLessonSaga({ payload }: IRemoveLessonSaga) {
  try {
    const { status, data } = yield fetchAPI(
      `/api/admin/remove-lesson/${payload.lessonId}`,
      payload.key
    );

    if (status === 200) {
      yield put(removeLessonSuccessAction(payload.groupId, payload.lessonId));
    } else if (status === 401) {
      yield put(checkAdminKeyFailedAction(data["err"]));
    } else {
      yield put(removeLessonFailedAction(data["err"]));
    }
  } catch (e) {
    console.error(e);
    yield put(
      removeLessonFailedAction("[SAGA ERROR] - removeLessonSaga: Ошибка в саге")
    );
  }
}

export function* changeLessonSaga({ payload }: IChangeLessonSaga) {
  try {
    const lesson = {
      title: payload.lesson.title,
      type: getStringFromLessonType(payload.lesson.type),
      user_group: getStringFromStudentGroup(payload.lesson.studentGroup),
      room: payload.lesson.place,
      teacher: payload.lesson.teacher,
      dates: payload.lesson.dates.map((date: Date) => date.getTime() / 1000),
      num: payload.lesson.time.num,
    };

    const { status, data } = yield fetchAPI(
      `/api/admin/update-lesson/${payload.lesson.id}`,
      payload.key,
      {
        lesson,
      }
    );

    if (status === 200) {
      yield put(changeLessonSuccessAction(payload.lesson));
    } else if (status === 401) {
      yield put(checkAdminKeyFailedAction(data["err"]));
    } else {
      yield put(changeLessonFailedAction(data["err"]));
    }
  } catch (e) {
    console.error(e);
    yield put(
      changeLessonFailedAction("[SAGA ERROR] - changeLessonSaga: Ошибка в саге")
    );
  }
}

export default function* lessonsSaga() {
  yield takeEvery(DOWNLOAD_LESSONS, downloadLessonsSaga);
  yield takeEvery(CREATE_LESSON, createLessonSaga);
  yield takeEvery(REMOVE_LESSON, removeLessonSaga);
  yield takeEvery(CHANGE_LESSON, changeLessonSaga);
}
