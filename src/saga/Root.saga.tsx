import { all } from "redux-saga/effects";

import groupsSaga from "./Groups.saga";
import lessonsSaga from "./Lessons.saga";
import appSaga from "./App.saga";

// TODO: Испрвать все объявления res на общий data
// TODO: Переименовать все ошибка саги на информативные
export default function* rootSaga() {
  yield all([appSaga(), groupsSaga(), lessonsSaga()]);
}
