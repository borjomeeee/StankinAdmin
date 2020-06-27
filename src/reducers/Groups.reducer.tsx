import { initialState, IGroupsInitialState } from "../redux/store";

import {
  DOWNLOAD_GROUPS_SUCCESS,
  CREATE_GROUP_SUCCESS,
  REMOVE_GROUP_SUCCESS,
} from "../utils/constants";
import { IGroupsActions } from "../utils/types";
import { IGroup } from "../models/Group.model";

export default (
  state: IGroupsInitialState = initialState.groups,
  action: IGroupsActions
): IGroupsInitialState => {
  switch (action.type) {
    case DOWNLOAD_GROUPS_SUCCESS:
      return action.payload.groups;
    case CREATE_GROUP_SUCCESS:
      return [...state, action.payload.group];
    case REMOVE_GROUP_SUCCESS:
      return state.filter(
        (group: IGroup) => group.id !== action.paylaod.groupId
      );
    default:
      return state;
  }
};
