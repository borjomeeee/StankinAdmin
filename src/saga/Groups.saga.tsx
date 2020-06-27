import { takeEvery, put, delay } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";

import {
  downloadGroupsSuccessAction,
  downloadGroupsFailedAction,
  ICreateGroupSaga,
  createGroupSuccessAction,
  createGroupFailedAction,
  IRemoveGroupSaga,
  removeGroupSuccessAction,
  removeGroupFailedAction,
} from "../actions/Groups.actions";

import {
  DOWNLOAD_GROUPS,
  CREATE_GROUP,
  REMOVE_GROUP,
} from "../utils/constants";

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

export function* addGroupSaga({ payload }: ICreateGroupSaga) {
  try {
    yield delay(1000);
    // SEND GROUP DATA TO SERVER AND GET NEW GROUP DATA OR ERROR

    let ok = true;
    let message = "Ошибка добавления группы";

    let group = new Group(uuidv4(), payload.groupName);

    if (ok) {
      yield put(createGroupSuccessAction(group));
    } else {
      yield put(createGroupFailedAction(message));
    }
  } catch (e) {
    yield put(createGroupFailedAction("Ошибка добавления группы"));
  }
}

export function* removeGroupSaga({ payload }: IRemoveGroupSaga) {
  try {
    yield delay(1000);
    // SEND GROUP ID TO SERVER AND GET STATUS ANSWER

    let ok = true;
    let message = "Ошибка удаления группы";

    if (ok) {
      yield put(removeGroupSuccessAction(payload.groupId));
    } else {
      yield put(removeGroupFailedAction(message));
    }
  } catch (e) {
    yield put(removeGroupFailedAction("Ошибка удаления группы"));
  }
}

export default function* groupsSaga() {
  yield takeEvery(DOWNLOAD_GROUPS, downloadGroupsSaga);
  yield takeEvery(CREATE_GROUP, addGroupSaga);
  yield takeEvery(REMOVE_GROUP, removeGroupSaga);
}
