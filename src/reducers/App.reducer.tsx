import { initialState, IAppInitialState } from "../redux/store";

import {
  DOWNLOAD_GROUPS,
  DOWNLOAD_GROUPS_SUCCESS,
  DOWNLOAD_GROUPS_FAILED,
  CREATE_GROUP,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILED,
  DOWNLOAD_LESSONS,
  DOWNLOAD_LESSONS_FAILED,
  DOWNLOAD_LESSONS_SUCCESS,
  REMOVE_GROUP,
  REMOVE_GROUP_SUCCESS,
  REMOVE_GROUP_FAILED,
} from "../utils/constants";

import { IAppActions } from "../utils/types";

export default (
  state: IAppInitialState = initialState.app,
  action: IAppActions
): IAppInitialState => {
  switch (action.type) {
    case DOWNLOAD_GROUPS:
      return { ...state, isLoading: true };
    case DOWNLOAD_GROUPS_SUCCESS:
      return { ...state, isLoading: false };
    case DOWNLOAD_GROUPS_FAILED:
      return { ...state, isLoading: false, error: action.payload.error };

    case CREATE_GROUP:
      return { ...state, isLoading: true };
    case CREATE_GROUP_SUCCESS:
      return { ...state, isLoading: false };
    case CREATE_GROUP_FAILED:
      return { ...state, isLoading: false, error: action.payload.error };

    case REMOVE_GROUP:
      return { ...state, isLoading: true };
    case REMOVE_GROUP_SUCCESS:
      return { ...state, isLoading: false };
    case REMOVE_GROUP_FAILED:
      return { ...state, error: action.payload.error };

    case DOWNLOAD_LESSONS:
      return { ...state, isLoading: true };
    case DOWNLOAD_LESSONS_SUCCESS:
      return { ...state, isLoading: false };
    case DOWNLOAD_LESSONS_FAILED:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
};
