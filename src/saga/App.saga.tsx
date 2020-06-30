import { takeLeading, delay, put } from "redux-saga/effects";
import { CHECK_ADMIN_KEY } from "../utils/constants";
import {
  ICheckAdminKeySaga,
  checkAdminKeyFailedAction,
  checkAdminKeySuccessAction,
} from "../actions/App.actions";

export function* checkAdminKeySaga({ payload }: ICheckAdminKeySaga) {
  try {
    yield delay(1000);
    // SEND KEY TO SERVER AND GET STATUS CODE

    let ok = true;
    let message = "Неверный ключ";

    if (ok) {
      yield put(checkAdminKeySuccessAction(payload.key));
    } else {
      yield put(checkAdminKeyFailedAction(message));
    }
  } catch (e) {
    yield put(checkAdminKeyFailedAction("Неверный ключ"));
  }
}

export default function* appSaga() {
  yield takeLeading(CHECK_ADMIN_KEY, checkAdminKeySaga);
}
