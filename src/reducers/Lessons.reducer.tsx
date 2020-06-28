import { initialState, ILessonsInitialState } from "../redux/store";

import {
  DOWNLOAD_LESSONS_SUCCESS,
  CREATE_LESSON_SUCCESS,
} from "../utils/constants";

import { ILessonsActions } from "../utils/types";

export default (
  state: ILessonsInitialState = initialState.lessons,
  action: ILessonsActions
): ILessonsInitialState => {
  switch (action.type) {
    case DOWNLOAD_LESSONS_SUCCESS:
      state.set(action.payload.groupId, action.payload.lessons);
      return new Map(state.entries());
    case CREATE_LESSON_SUCCESS:
      const currLessons = state.get(action.payload.groupId) || [];
      state.set(action.payload.groupId, [
        ...currLessons,
        action.payload.lesson,
      ]);
      return new Map(state.entries());
    default:
      return state;
  }
};
