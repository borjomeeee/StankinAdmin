import { takeLeading, put } from "redux-saga/effects";
import { CHECK_ADMIN_KEY } from "../utils/constants";
import {
  ICheckAdminKeySaga,
  checkAdminKeyFailedAction,
  checkAdminKeySuccessAction,
} from "../actions/App.actions";

import { fetchAPI } from "./Root.saga";

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

export default function* appSaga() {
  yield takeLeading(CHECK_ADMIN_KEY, checkAdminKeySaga);
}
