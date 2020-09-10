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
  downloadGroupsAction,
} from "../actions/Groups.actions";
import { checkAdminKeyFailedAction } from "../actions/App.actions";

import {
  DOWNLOAD_GROUPS,
  CREATE_GROUP,
  REMOVE_GROUP,
  CHANGE_GROUP_TITLE,
} from "../utils/constants";

import Group from "../models/Group.model";
import { fetchAPI } from "./Root.saga";

export function* downloadGroupsSaga({
  payload,
}: ReturnType<typeof downloadGroupsAction>) {
  try {
    const { status, data } = yield fetchAPI(
      "/api/admin/load-schedules",
      payload.key
    );

    if (status === 200) {
      if (Array.isArray(data)) {
        const validGroups = data.map(
          (group: any) =>
            new Group(group["_id"], group["name"], group["last_update"])
        );

        yield put(downloadGroupsSuccessAction(validGroups));
      } else {
        yield put(
          downloadGroupsFailedAction(
            "[SAGA ERROR] - downloadGroupsSaga: Данные пришли не в виде массива"
          )
        );
      }
    } else if (status === 401) {
      yield put(checkAdminKeyFailedAction(data["err"]));
    } else {
      yield put(downloadGroupsFailedAction(data["err"]));
    }
  } catch (e) {
    console.error(e);
    yield put(
      downloadGroupsFailedAction(
        "[SAGA ERROR] - downloadGroupsSaga: Ошибка в саге"
      )
    );
  }
}

export function* addGroupSaga({ payload }: ICreateGroupSaga) {
  try {
    const { status, data } = yield fetchAPI(
      "/api/admin/add-group",
      payload.key,
      {
        groupName: payload.groupName,
      }
    );

    if (status === 200) {
      const newGroup = new Group(
        data["_id"],
        data["name"],
        data["last_update"]
      );
      yield put(createGroupSuccessAction(newGroup));
    } else if (status === 401) {
      yield put(checkAdminKeyFailedAction(data["err"]));
    } else {
      yield put(createGroupFailedAction(data["err"]));
    }
  } catch (e) {
    console.error(e);
    yield put(
      createGroupFailedAction("[SAGA ERROR] - addGroupSaga: Ошибка в саге")
    );
  }
}

export function* removeGroupSaga({ payload }: IRemoveGroupSaga) {
  try {
    const { status, data } = yield fetchAPI(
      `/api/admin/remove-group/${payload.groupId}`,
      payload.key
    );

    if (status === 200) {
      yield put(removeGroupSuccessAction(payload.groupId));
    } else if (status === 401) {
      yield put(checkAdminKeyFailedAction(data["err"]));
    } else {
      yield put(removeGroupFailedAction(data["err"]));
    }
  } catch (e) {
    console.error(e);
    yield put(
      removeGroupFailedAction("[SAGA ERROR] - removeGroupSaga: Ошибка в саге")
    );
  }
}

export function* changeTitleGroupSaga({ payload }: IChangeGroupTitleSaga) {
  try {
    const {
      status,
      data,
    } = yield fetchAPI(
      `/api/admin/update-group-title/${payload.groupId}`,
      payload.key,
      { groupName: payload.groupTitle }
    );

    if (status === 200) {
      yield put(changeGroupTitleSuccessAction(data["_id"], data["name"]));
    } else if (status === 401) {
      yield put(checkAdminKeyFailedAction(data["err"]));
    } else {
      yield put(changeGroupTitleFailedAction(data["err"]));
    }
  } catch (e) {
    console.error(e);
    yield put(
      changeGroupTitleFailedAction(
        "[SAGA ERROR] - changeTitleGroupSaga: Ошибка в саге"
      )
    );
  }
}

export default function* groupsSaga() {
  yield takeEvery(DOWNLOAD_GROUPS, downloadGroupsSaga);
  yield takeEvery(CREATE_GROUP, addGroupSaga);
  yield takeEvery(REMOVE_GROUP, removeGroupSaga);
  yield takeEvery(CHANGE_GROUP_TITLE, changeTitleGroupSaga);
}
