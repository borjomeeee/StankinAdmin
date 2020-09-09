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
  CHANGE_GROUP_TITLE,
  CHANGE_GROUP_TITLE_SUCCESS,
  CHANGE_GROUP_TITLE_FAILED,
  CREATE_LESSON,
  CREATE_LESSON_FAILED,
  CREATE_LESSON_SUCCESS,
  REMOVE_LESSON,
  REMOVE_LESSON_SUCCESS,
  REMOVE_LESSON_FAILED,
  CHANGE_LESSON,
  CHANGE_LESSON_SUCCESS,
  CHANGE_LESSON_FAILED,
  CHECK_ADMIN_KEY,
  CHECK_ADMIN_KEY_SUCCESS,
  CHECK_ADMIN_KEY_FAILED,
  CLEAR_ERROR,
  UPDATE_SCHEDULES,
  UPDATE_SCHEDULES_SUCCESS,
  UPDATE_SCHEDULES_FAILED,
} from "../utils/constants";

import { IAppActions } from "../utils/types";

export default (
  state: IAppInitialState = initialState.app,
  action: IAppActions
): IAppInitialState => {
  switch (action.type) {
    case CHECK_ADMIN_KEY:
      return { ...state, isAuth: false, isLoading: true };
    case CHECK_ADMIN_KEY_SUCCESS:
      return {
        ...state,
        isAuth: true,
        appKey: action.payload.key,
        isLoading: false,
      };
    case CHECK_ADMIN_KEY_FAILED:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        error: action.payload.error,
      };

    case UPDATE_SCHEDULES:
      return { ...state, isLoading: true };
    case UPDATE_SCHEDULES_SUCCESS:
      return { ...state, isLoading: false };
    case UPDATE_SCHEDULES_FAILED:
      return { ...state, isLoading: false, error: action.payload.error };

    case CLEAR_ERROR:
      return { ...state, error: "" };

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
      return { ...state, isLoading: false, error: action.payload.error };

    case DOWNLOAD_LESSONS:
      return { ...state, isLoading: true };
    case DOWNLOAD_LESSONS_SUCCESS:
      return { ...state, isLoading: false };
    case DOWNLOAD_LESSONS_FAILED:
      return { ...state, isLoading: false, error: action.payload.error };

    case CHANGE_GROUP_TITLE:
      return { ...state, isLoading: true };
    case CHANGE_GROUP_TITLE_SUCCESS:
      return { ...state, isLoading: false };
    case CHANGE_GROUP_TITLE_FAILED:
      return { ...state, isLoading: false, error: action.payload.error };

    case CREATE_LESSON:
      return { ...state, isLoading: true };
    case CREATE_LESSON_SUCCESS:
      return { ...state, isLoading: false };
    case CREATE_LESSON_FAILED:
      return { ...state, isLoading: false, error: action.payload.error };

    case REMOVE_LESSON:
      return { ...state, isLoading: true };
    case REMOVE_LESSON_SUCCESS:
      return { ...state, isLoading: false };
    case REMOVE_LESSON_FAILED:
      return { ...state, isLoading: false, error: action.payload.error };

    case CHANGE_LESSON:
      return { ...state, isLoading: true };
    case CHANGE_LESSON_SUCCESS:
      return { ...state, isLoading: false };
    case CHANGE_LESSON_FAILED:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
};
