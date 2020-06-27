import { initialState, IMainScreenInitialState } from "../redux/store";

import { IMainScreenActions } from "../utils/types";

import {
  CHANGE_SEARCH_GROUP_NAME,
  DOWNLOAD_GROUPS,
  DOWNLOAD_GROUPS_SUCCESS,
  DOWNLOAD_GROUPS_FAILED,
  ADD_GROUP,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAILED,
} from "../utils/constants";

export default (
  state: IMainScreenInitialState = initialState.mainScreen,
  action: IMainScreenActions
): IMainScreenInitialState => {
  switch (action.type) {
    case CHANGE_SEARCH_GROUP_NAME:
      return { ...state, searchGroupText: action.payload.value };

    case DOWNLOAD_GROUPS:
      return { ...state, isLoadingGroups: true };
    case DOWNLOAD_GROUPS_SUCCESS:
    case DOWNLOAD_GROUPS_FAILED:
      return { ...state, isLoadingGroups: false };

    case ADD_GROUP:
      return { ...state, isAddingGroup: true };
    case ADD_GROUP_SUCCESS:
    case ADD_GROUP_FAILED:
      return { ...state, isAddingGroup: false };
    default:
      return state;
  }
};
