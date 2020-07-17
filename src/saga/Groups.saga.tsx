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
  IChangeGroupTitleSaga,
  changeGroupTitleSuccessAction,
  changeGroupTitleFailedAction,
  IDownloadGroupsSagaProps,
} from "../actions/Groups.actions";
import { checkAdminKeyFailedAction } from "../actions/App.actions";

import {
  DOWNLOAD_GROUPS,
  CREATE_GROUP,
  REMOVE_GROUP,
  CHANGE_GROUP_TITLE,
} from "../utils/constants";

import Group from "../models/Group.model";

export function* downloadGroupsSaga({ payload }: IDownloadGroupsSagaProps) {
  try {
    const res = yield fetch("http://localhost:5000/api/admin/load-schedules", {
      method: "POST",
      body: JSON.stringify({ key: payload.key }),
    });

    if (res.status === 200) {
      const groups = yield res.json();

      const validGroups = groups.map(
        (group: any) =>
          new Group(group["_id"], group["name"], group["last_update"])
      );

      yield put(downloadGroupsSuccessAction(validGroups));
    } else if (res.status === 401) {
      const err = yield res.json();
      checkAdminKeyFailedAction(err);
    } else {
      const err = yield res.json();
      yield put(downloadGroupsFailedAction(err));
    }
  } catch (e) {
    console.log(e);
    yield put(downloadGroupsFailedAction("Ошибка скачивания раписаний"));
  }
}

export function* addGroupSaga({ payload }: ICreateGroupSaga) {
  try {
    const res = yield fetch("http://localhost:5000/api/admin/add-group", {
      method: "POST",
      body: JSON.stringify({ key: payload.key, groupName: payload.groupName }),
    });

    if (res.status === 200) {
      const groupData = yield res.json();
      const newGroup = new Group(
        groupData["_id"],
        groupData["name"],
        groupData["last_update"]
      );
      yield put(createGroupSuccessAction(newGroup));
    } else if (res.status === 401) {
      const err = yield res.json();
      checkAdminKeyFailedAction(err);
    } else {
      const err = yield res.json();
      yield put(createGroupFailedAction(err));
    }
  } catch (e) {
    yield put(createGroupFailedAction("Ошибка добавления группы"));
  }
}

export function* removeGroupSaga({ payload }: IRemoveGroupSaga) {
  try {
    const res = yield fetch(
      `http://localhost:5000/api/admin/remove-group/${payload.groupId}`,
      {
        method: "POST",
        body: JSON.stringify({ key: payload.key }),
      }
    );

    if (res.status === 200) {
      yield put(removeGroupSuccessAction(payload.groupId));
    } else if (res.status === 401) {
      const err = yield res.json();
      checkAdminKeyFailedAction(err);
    } else {
      const err = yield res.json();
      yield put(removeGroupFailedAction(err));
    }
  } catch (e) {
    yield put(removeGroupFailedAction("Ошибка удаления группы"));
  }
}

export function* changeTitleGroupSaga({ payload }: IChangeGroupTitleSaga) {
  try {
    yield delay(1000);
    // SEND DATA TO SERVER AND GET STATUS ANSWER

    let ok = true;
    let message = "Ошибка изменения навания группы";

    if (ok) {
      yield put(
        changeGroupTitleSuccessAction(payload.groupId, payload.groupTitle)
      );
    } else {
      yield put(changeGroupTitleFailedAction(message));
    }
  } catch (e) {
    yield put(changeGroupTitleFailedAction("Ошибка изменения навания группы"));
  }
}

export default function* groupsSaga() {
  yield takeEvery(DOWNLOAD_GROUPS, downloadGroupsSaga);
  yield takeEvery(CREATE_GROUP, addGroupSaga);
  yield takeEvery(REMOVE_GROUP, removeGroupSaga);
  yield takeEvery(CHANGE_GROUP_TITLE, changeTitleGroupSaga);
}
