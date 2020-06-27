import { initialState, IGroupScreenInitialState } from "../redux/store";

import { IGroupScreenActions } from "../utils/types";

import { CHANGE_SEARCH_LESSON_NAME } from "../utils/constants";

export default (
  state: IGroupScreenInitialState = initialState.groupScreen,
  action: IGroupScreenActions
): IGroupScreenInitialState => {
  switch (action.type) {
    case CHANGE_SEARCH_LESSON_NAME:
      return { ...state, searchLessonText: action.payload.value };
    default:
      return state;
  }
};
