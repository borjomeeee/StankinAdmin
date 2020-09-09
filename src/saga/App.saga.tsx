import { takeLeading, put } from "redux-saga/effects";
import {
  CHECK_ADMIN_KEY,
  UPDATE_SCHEDULES,
} from "../utils/constants";
import {
  ICheckAdminKeySaga,
  checkAdminKeyFailedAction,
  checkAdminKeySuccessAction,
  updateSchedulesAction,
  updateSchedulesSuccessAction,
  updateSchedulesFailedAction,
} from "../actions/App.actions";

import { fetchAPI } from "./Root.saga";
import { downloadGroupsAction } from "../actions/Groups.actions";

export function* checkAdminKeySaga({ payload }: ICheckAdminKeySaga) {
  try {
    const { status, data } = yield fetchAPI(
      "/api/admin/hello_admin",
      payload.key
    );

    if (status === 200) {
      yield put(checkAdminKeySuccessAction(payload.key));
    } else {
      yield put(checkAdminKeyFailedAction(data["err"]));
    }
  } catch (e) {
    console.error(e);
    yield put(checkAdminKeyFailedAction("[SAGA ERROR] checkAdminKeySaga!"));
  }
}

export function* updateSchedulesSaga({
  payload,
}: ReturnType<typeof updateSchedulesAction>) {
  try {
    const { status, data } = yield fetchAPI(
      "/api/admin/download-schedules",
      payload.key
    );

    if (status === 200) {
      yield put(updateSchedulesSuccessAction());
      yield put(downloadGroupsAction(payload.key));
    } else {
      yield put(updateSchedulesFailedAction(data["err"]));
    }
  } catch (e) {
    console.error(e);
    yield put(updateSchedulesFailedAction("[SAGA ERROR] updateSchedulesSaga!"));
  }
}

export default function* appSaga() {
  yield takeLeading(CHECK_ADMIN_KEY, checkAdminKeySaga);
  yield takeLeading(UPDATE_SCHEDULES, updateSchedulesSaga);
}
