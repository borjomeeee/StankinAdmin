import { takeEvery } from "redux-saga/effects";
import { DOWNLOAD_LESSONS } from "../utils/constants";

export function* downloadLessonsSaga({}: any) {}

export default function* lessonsSaga() {
  yield takeEvery(DOWNLOAD_LESSONS, downloadLessonsSaga);
}
