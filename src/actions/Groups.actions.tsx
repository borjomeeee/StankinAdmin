import { IGroupsInitialState } from "../redux/store";

import {
  DOWNLOAD_GROUPS,
  DOWNLOAD_GROUPS_SUCCESS,
  DOWNLOAD_GROUPS_FAILED,
  IAction,
  CREATE_GROUP,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILED,
  REMOVE_GROUP,
  REMOVE_GROUP_SUCCESS,
  REMOVE_GROUP_FAILED,
  CHANGE_GROUP_TITLE,
  CHANGE_GROUP_TITLE_SUCCESS,
  CHANGE_GROUP_TITLE_FAILED,
} from "../utils/constants";

import { IGroup } from "../models/Group.model";

export interface IDownloadGroupsSagaProps extends IAction {}
export interface ICreateGroupSaga extends IAction {
  payload: { groupName: string };
}
export interface IRemoveGroupSaga extends IAction {
  payload: { groupId: string };
}
export interface IChangeGroupTitleSaga extends IAction {
  payload: { groupId: string; groupTitle: string };
}

// Downloads
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

// Create
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

// Remove
export const removeGroupAction = (groupId: string) =>
  ({
    type: REMOVE_GROUP,
    payload: { groupId },
  } as const);

export const removeGroupSuccessAction = (groupId: string) =>
  ({
    type: REMOVE_GROUP_SUCCESS,
    paylaod: { groupId },
  } as const);

export const removeGroupFailedAction = (error: string) =>
  ({
    type: REMOVE_GROUP_FAILED,
    payload: { error },
  } as const);

// Change
export const changeGroupTitleAction = (groupId: string, groupTitle: string) =>
  ({
    type: CHANGE_GROUP_TITLE,
    payload: { groupId, groupTitle },
  } as const);

export const changeGroupTitleSuccessAction = (groupId: string, groupTitle: string) =>
  ({
    type: CHANGE_GROUP_TITLE_SUCCESS,
    payload: { groupId, groupTitle },
  } as const);

export const changeGroupTitleFailedAction = (error: string) =>
  ({
    type: CHANGE_GROUP_TITLE_FAILED,
    payload: { error },
  } as const);
