import {
  CHANGE_SEARCH_GROUP_NAME,
  ADD_GROUP,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAILED,
  IAction,
} from "../utils/constants";

import { IGroup } from "../models/Group.model";

export interface AddGroupSaga extends IAction {
  payload: { groupName: string };
}

export const changeSearchGroupNameAction = (value: string) =>
  ({
    type: CHANGE_SEARCH_GROUP_NAME,
    payload: { value },
  } as const);

export const addGroupAction = (groupName: string) =>
  ({
    type: ADD_GROUP,
    payload: { groupName },
  } as const);

export const addGroupSuccessAction = (group: IGroup) =>
  ({
    type: ADD_GROUP_SUCCESS,
    payload: { group },
  } as const);

export const addGroupFailedAction = (error: string) =>
  ({
    type: ADD_GROUP_FAILED,
    payload: { error },
  } as const);
