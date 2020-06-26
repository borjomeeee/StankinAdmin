import { IGroupsInitialState } from "../redux/store";

import {
  DOWNLOAD_GROUPS,
  DOWNLOAD_GROUPS_SUCCESS,
  DOWNLOAD_GROUPS_FAILED,
  IAction,
} from "../utils/constants";

export interface IDownloadGroupsSagaProps extends IAction {}

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
