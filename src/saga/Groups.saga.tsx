import { takeEvery, put } from "redux-saga/effects";
import { DOWNLOAD_GROUPS } from "../utils/constants";

export function* downloadGroupsSaga({}: any) {}

export default function* groupsSaga() {
  yield takeEvery(DOWNLOAD_GROUPS, downloadGroupsSaga);
}
