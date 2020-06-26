import { takeEvery, put, delay } from "redux-saga/effects";

import {
  downloadGroupsSuccessAction,
  downloadGroupsFailedAction,
} from "../actions/Groups.actions";

import { DOWNLOAD_GROUPS } from "../utils/constants";

import Group from "../models/Group.model";

export function* downloadGroupsSaga() {
  try {
    yield delay(1000);
    // DOWNLOAD DATA FROM SERVER

    let ok = true;
    let message = "Ошибка скачивания раписаний";

    const groups = [
      new Group(1, "ИДБ-18-07"),
      new Group(2, "ИДБ-18-06"),
      new Group(3, "ИДБ-18-06"),
    ];

    if (ok) {
      yield put(downloadGroupsSuccessAction(groups));
    } else {
      yield put(downloadGroupsFailedAction(message));
    }
  } catch (e) {
    yield put(downloadGroupsFailedAction("Ошибка скачивания раписаний"));
  }
}

export default function* groupsSaga() {
  yield takeEvery(DOWNLOAD_GROUPS, downloadGroupsSaga);
}
