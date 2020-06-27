import { initialState, IGroupsInitialState } from "../redux/store";

import { DOWNLOAD_GROUPS_SUCCESS, ADD_GROUP_SUCCESS } from "../utils/constants";
import { IGroupsActions } from "../utils/types";

export default (
  state: IGroupsInitialState = initialState.groups,
  action: IGroupsActions
): IGroupsInitialState => {
  switch (action.type) {
    case DOWNLOAD_GROUPS_SUCCESS:
      return action.payload.groups;
    case ADD_GROUP_SUCCESS:
      return [...state, action.payload.group];
    default:
      return state;
  }
};
