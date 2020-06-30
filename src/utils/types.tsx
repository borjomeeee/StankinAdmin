import { changeSearchGroupNameAction } from "../actions/MainScreen.actions";

import {
  downloadGroupsAction,
  downloadGroupsSuccessAction,
  downloadGroupsFailedAction,
  createGroupAction,
  createGroupSuccessAction,
  createGroupFailedAction,
  removeGroupAction,
  removeGroupSuccessAction,
  removeGroupFailedAction,
  changeGroupTitleAction,
  changeGroupTitleSuccessAction,
  changeGroupTitleFailedAction,
} from "../actions/Groups.actions";

import {
  downloadLessonsAction,
  downloadLessonsSuccessAction,
  downloadLessonsFailedAction,
  createLessonAction,
  createLessonSuccessAction,
  createLessonFailedAction,
  removeLessonAction,
  removeLessonSuccessAction,
  removeLessonFailedAction,
  changeLessonSuccessAction,
  changeLessonFailedAction,
  changeLessonAction,
} from "../actions/Lessons.actions";

import { changeSearchLessonsNameAction } from "../actions/GroupScreen.actions";

export type IAppActions =
  | ReturnType<typeof downloadGroupsAction>
  | ReturnType<typeof downloadGroupsSuccessAction>
  | ReturnType<typeof downloadGroupsFailedAction>
  | ReturnType<typeof createGroupAction>
  | ReturnType<typeof createGroupSuccessAction>
  | ReturnType<typeof createGroupFailedAction>
  | ReturnType<typeof downloadLessonsAction>
  | ReturnType<typeof downloadLessonsSuccessAction>
  | ReturnType<typeof downloadLessonsFailedAction>
  | ReturnType<typeof createLessonAction>
  | ReturnType<typeof createLessonSuccessAction>
  | ReturnType<typeof createLessonFailedAction>
  | ReturnType<typeof removeGroupAction>
  | ReturnType<typeof removeGroupSuccessAction>
  | ReturnType<typeof removeGroupFailedAction>
  | ReturnType<typeof changeGroupTitleAction>
  | ReturnType<typeof changeGroupTitleSuccessAction>
  | ReturnType<typeof changeGroupTitleFailedAction>
  | ReturnType<typeof removeLessonAction>
  | ReturnType<typeof removeLessonSuccessAction>
  | ReturnType<typeof removeLessonFailedAction>
  | ReturnType<typeof changeLessonAction>
  | ReturnType<typeof changeLessonSuccessAction>
  | ReturnType<typeof changeLessonFailedAction>;

// MainScreen
export type IMainScreenActions = ReturnType<typeof changeSearchGroupNameAction>;

// Groups
export type IGroupsActions =
  | ReturnType<typeof downloadGroupsAction>
  | ReturnType<typeof downloadGroupsSuccessAction>
  | ReturnType<typeof downloadGroupsFailedAction>
  | ReturnType<typeof createGroupAction>
  | ReturnType<typeof createGroupSuccessAction>
  | ReturnType<typeof createGroupFailedAction>
  | ReturnType<typeof removeGroupAction>
  | ReturnType<typeof removeGroupSuccessAction>
  | ReturnType<typeof removeGroupFailedAction>
  | ReturnType<typeof changeGroupTitleAction>
  | ReturnType<typeof changeGroupTitleSuccessAction>
  | ReturnType<typeof changeGroupTitleFailedAction>;

// Lessons
export type ILessonsActions =
  | ReturnType<typeof downloadLessonsAction>
  | ReturnType<typeof downloadLessonsSuccessAction>
  | ReturnType<typeof downloadLessonsFailedAction>
  | ReturnType<typeof createLessonAction>
  | ReturnType<typeof createLessonSuccessAction>
  | ReturnType<typeof createLessonFailedAction>
  | ReturnType<typeof removeLessonAction>
  | ReturnType<typeof removeLessonSuccessAction>
  | ReturnType<typeof removeLessonFailedAction>
  | ReturnType<typeof changeLessonAction>
  | ReturnType<typeof changeLessonSuccessAction>
  | ReturnType<typeof changeLessonFailedAction>;

// GroupScreen
export type IGroupScreenActions = ReturnType<
  typeof changeSearchLessonsNameAction
>;
