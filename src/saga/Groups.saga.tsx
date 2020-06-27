import { takeEvery, put, delay } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";

import {
  downloadGroupsSuccessAction,
  downloadGroupsFailedAction,
} from "../actions/Groups.actions";

import {
  AddGroupSaga,
  addGroupSuccessAction,
  addGroupFailedAction,
} from "../actions/MainScreen.actions";

import { DOWNLOAD_GROUPS, ADD_GROUP } from "../utils/constants";

import Group from "../models/Group.model";

export function* downloadGroupsSaga() {
  try {
    yield delay(1000);
    // DOWNLOAD DATA FROM SERVER

    let ok = true;
    let message = "Ошибка скачивания раписаний";

    const groups = [
      new Group(uuidv4(), "ИДБ-18-07"),
      new Group(uuidv4(), "ИДБ-18-06"),
      new Group(uuidv4(), "ИДБ-18-06"),
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

export function* addGroupSaga({ payload }: AddGroupSaga) {
  try {
    yield delay(1000);
    // SEND GROUP DATA TO SERVER AND GET NEW GROUP DATA OR ERROR

    let ok = true;
    let message = "Ошибка добавления группы";

    let group = new Group(uuidv4(), payload.groupName);

    if (ok) {
      yield put(addGroupSuccessAction(group));
    } else {
      yield put(addGroupFailedAction(message));
    }
  } catch (e) {
    yield put(addGroupFailedAction("Ошибка добавления группы"));
  }
}

export default function* groupsSaga() {
  yield takeEvery(DOWNLOAD_GROUPS, downloadGroupsSaga);
  yield takeEvery(ADD_GROUP, addGroupSaga);
}
