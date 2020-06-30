import { all } from "redux-saga/effects";

import groupsSaga from "./Groups.saga";
import lessonsSaga from "./Lessons.saga";
import appSaga from "./App.saga";

export default function* rootSaga() {
  yield all([appSaga(), groupsSaga(), lessonsSaga()]);
}
