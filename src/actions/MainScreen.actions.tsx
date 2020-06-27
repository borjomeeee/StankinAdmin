import { CHANGE_SEARCH_GROUP_NAME } from "../utils/constants";

export const changeSearchGroupNameAction = (value: string) =>
  ({
    type: CHANGE_SEARCH_GROUP_NAME,
    payload: { value },
  } as const);
