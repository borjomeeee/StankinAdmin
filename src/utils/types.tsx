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
} from "../actions/Groups.actions";

import {
  downloadLessonsAction,
  downloadLessonsSuccessAction,
  downloadLessonsFailedAction,
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
  | ReturnType<typeof removeGroupAction>
  | ReturnType<typeof removeGroupSuccessAction>
  | ReturnType<typeof removeGroupFailedAction>;

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
  | ReturnType<typeof removeGroupFailedAction>;

// Lessons
export type ILessonsActions =
  | ReturnType<typeof downloadLessonsAction>
  | ReturnType<typeof downloadLessonsSuccessAction>
  | ReturnType<typeof downloadLessonsFailedAction>;

// GroupScreen
export type IGroupScreenActions = ReturnType<
  typeof changeSearchLessonsNameAction
>;
