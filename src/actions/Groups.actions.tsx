import { IGroupsInitialState } from "../redux/store";

import {
  DOWNLOAD_GROUPS,
  DOWNLOAD_GROUPS_SUCCESS,
  DOWNLOAD_GROUPS_FAILED,
  IAction,
  CREATE_GROUP,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILED,
} from "../utils/constants";

import { IGroup } from "../models/Group.model";

export interface IDownloadGroupsSagaProps extends IAction {}
export interface CreateGroupSaga extends IAction {
  payload: { groupName: string };
}

export const downloadGroupsAction = () =>
  ({
    type: DOWNLOAD_GROUPS,
  } as const);

export const downloadGroupsSuccessAction = (groups: IGroupsInitialState) =>
  ({
    type: DOWNLOAD_GROUPS_SUCCESS,
    payload: { groups },
  } as const);

export const downloadGroupsFailedAction = (error: string) =>
  ({
    type: DOWNLOAD_GROUPS_FAILED,
    payload: { error },
  } as const);

export const createGroupAction = (groupName: string) =>
  ({
    type: CREATE_GROUP,
    payload: { groupName },
  } as const);

export const createGroupSuccessAction = (group: IGroup) =>
  ({
    type: CREATE_GROUP_SUCCESS,
    payload: { group },
  } as const);

export const createGroupFailedAction = (error: string) =>
  ({
    type: CREATE_GROUP_FAILED,
    payload: { error },
  } as const);
