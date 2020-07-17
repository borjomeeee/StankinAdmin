import { takeLeading, put } from "redux-saga/effects";
import { CHECK_ADMIN_KEY } from "../utils/constants";
import {
  ICheckAdminKeySaga,
  checkAdminKeyFailedAction,
  checkAdminKeySuccessAction,
} from "../actions/App.actions";

export function* checkAdminKeySaga({ payload }: ICheckAdminKeySaga) {
  try {
    const res = yield fetch("http://localhost:5000//api/admin/hello_admin", {
      method: "POST",
      body: JSON.stringify({ key: payload.key }),
    });

    if (res.status === 200) {
      yield put(checkAdminKeySuccessAction(payload.key));
    } else {
      const err = yield res.json();
      yield put(checkAdminKeyFailedAction(err));
    }
  } catch (e) {
    yield put(checkAdminKeyFailedAction("Ошибка сервера!"));
  }
}

export default function* appSaga() {
  yield takeLeading(CHECK_ADMIN_KEY, checkAdminKeySaga);
}
