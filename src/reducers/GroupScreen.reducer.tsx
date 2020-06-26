import { initialState, IGroupScreenInitialState } from "../redux/store";

import { IGroupScreenActions } from "../utils/types";

import {
  DOWNLOAD_LESSONS,
  DOWNLOAD_LESSONS_SUCCESS,
  DOWNLOAD_LESSONS_FAILED,
} from "../utils/constants";

export default (
  state: IGroupScreenInitialState = initialState.groupScreen,
  action: IGroupScreenActions
): IGroupScreenInitialState => {
  switch (action.type) {
    case DOWNLOAD_LESSONS:
      return { ...state, isLoadingLessons: true };
    case DOWNLOAD_LESSONS_SUCCESS:
    case DOWNLOAD_LESSONS_FAILED:
      return { ...state, isLoadingLessons: false };
    default:
      return state;
  }
};
