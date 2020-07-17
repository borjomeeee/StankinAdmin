import { takeEvery, put } from "redux-saga/effects";

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
      checkAdminKeyFailedAction(err["err"]);
    } else {
      const err = yield res.json();
      yield put(downloadGroupsFailedAction(err["errr"]));
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
      checkAdminKeyFailedAction(err["err"]);
    } else {
      const err = yield res.json();
      yield put(createGroupFailedAction(err["err"]));
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
      checkAdminKeyFailedAction(err["err"]);
    } else {
      const err = yield res.json();
      yield put(removeGroupFailedAction(err["err"]));
    }
  } catch (e) {
    yield put(removeGroupFailedAction("Ошибка удаления группы"));
  }
}

export function* changeTitleGroupSaga({ payload }: IChangeGroupTitleSaga) {
  try {
    const res = yield fetch(
      `http://localhost:5000/api/admin/update-group-title/${payload.groupId}`,
      {
        method: "POST",
        body: JSON.stringify({
          key: payload.key,
          groupName: payload.groupTitle,
        }),
      }
    );

    if (res.status === 200) {
      const group = yield res.json();
      yield put(changeGroupTitleSuccessAction(group["_id"], group["name"]));
    } else if (res.status === 401) {
      const err = yield res.json();
      checkAdminKeyFailedAction(err["err"]);
    } else {
      const err = yield res.json();
      yield put(changeGroupTitleFailedAction(err["err"]));
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
