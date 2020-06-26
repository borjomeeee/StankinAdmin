import { CHANGE_SEARCH_LESSON_NAME } from "../utils/constants";

export const changeSearchLessonsNameAction = (value: string) =>
  ({
    type: CHANGE_SEARCH_LESSON_NAME,
    payload: { value },
  } as const);
