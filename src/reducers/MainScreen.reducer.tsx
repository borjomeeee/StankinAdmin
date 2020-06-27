import { initialState, IMainScreenInitialState } from "../redux/store";

import { IMainScreenActions } from "../utils/types";

import { CHANGE_SEARCH_GROUP_NAME } from "../utils/constants";

export default (
  state: IMainScreenInitialState = initialState.mainScreen,
  action: IMainScreenActions
): IMainScreenInitialState => {
  switch (action.type) {
    case CHANGE_SEARCH_GROUP_NAME:
      return { ...state, searchGroupText: action.payload.value };
    default:
      return state;
  }
};
