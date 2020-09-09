import {
  CHECK_ADMIN_KEY,
  IAction,
  CHECK_ADMIN_KEY_SUCCESS,
  CHECK_ADMIN_KEY_FAILED,
  CLEAR_ERROR,
  UPDATE_SCHEDULES,
  UPDATE_SCHEDULES_SUCCESS,
  UPDATE_SCHEDULES_FAILED,
} from "../utils/constants";

export interface ICheckAdminKeySaga extends IAction {
  payload: { key: string };
}

export const checkAdminKeyAction = (key: string) =>
  ({
    type: CHECK_ADMIN_KEY,
    payload: { key },
  } as const);

export const checkAdminKeySuccessAction = (key: string) =>
  ({
    type: CHECK_ADMIN_KEY_SUCCESS,
    payload: { key },
  } as const);

export const checkAdminKeyFailedAction = (error: string) =>
  ({
    type: CHECK_ADMIN_KEY_FAILED,
    payload: { error },
  } as const);

export const updateSchedulesAction = (key: string) =>
  ({
    type: UPDATE_SCHEDULES,
    payload: { key }
  } as const);

export const updateSchedulesSuccessAction = () =>
  ({
    type: UPDATE_SCHEDULES_SUCCESS,
  } as const);

export const updateSchedulesFailedAction = (error: string) =>
  ({
    type: UPDATE_SCHEDULES_FAILED,
    payload: { error },
  } as const);

export const clearErrorAction = () =>
  ({
    type: CLEAR_ERROR,
  } as const);
