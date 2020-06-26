import { all } from "redux-saga/effects";

import groupsSaga from "./Groups.saga";
import lessonsSaga from "./Lessons.saga";

export default function* rootSaga() {
  yield all([groupsSaga(), lessonsSaga()]);
}
