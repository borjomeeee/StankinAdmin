import { initialState, ILessonsInitialState } from "../redux/store";

import { DOWNLOAD_LESSONS_SUCCESS } from "../utils/constants";

import { ILessonsActions } from "../utils/types";

export default (
  state: ILessonsInitialState = initialState.lessons,
  action: ILessonsActions
): ILessonsInitialState => {
  switch (action.type) {
    case DOWNLOAD_LESSONS_SUCCESS:
      state.set(action.payload.groupId, action.payload.lessons);
      return new Map(state.entries());
    default:
      return state;
  }
};
