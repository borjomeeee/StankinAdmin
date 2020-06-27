import {
  changeSearchGroupNameAction,
  addGroupAction,
  addGroupSuccessAction,
  addGroupFailedAction,
} from "../actions/MainScreen.actions";

import {
  downloadGroupsAction,
  downloadGroupsSuccessAction,
  downloadGroupsFailedAction,
} from "../actions/Groups.actions";

import {
  downloadLessonsAction,
  downloadLessonsSuccessAction,
  downloadLessonsFailedAction,
} from "../actions/Lessons.actions";

import { changeSearchLessonsNameAction } from "../actions/GroupScreen.actions";

// MainScreen
export type IMainScreenActions =
  | ReturnType<typeof changeSearchGroupNameAction>
  | ReturnType<typeof downloadGroupsAction>
  | ReturnType<typeof downloadGroupsSuccessAction>
  | ReturnType<typeof downloadGroupsFailedAction>
  | ReturnType<typeof addGroupAction>
  | ReturnType<typeof addGroupSuccessAction>
  | ReturnType<typeof addGroupFailedAction>;

// Groups
export type IGroupsActions =
  | ReturnType<typeof downloadGroupsAction>
  | ReturnType<typeof downloadGroupsSuccessAction>
  | ReturnType<typeof downloadGroupsFailedAction>
  | ReturnType<typeof addGroupAction>
  | ReturnType<typeof addGroupSuccessAction>
  | ReturnType<typeof addGroupFailedAction>;

// Lessons
export type ILessonsActions =
  | ReturnType<typeof downloadLessonsAction>
  | ReturnType<typeof downloadLessonsSuccessAction>
  | ReturnType<typeof downloadLessonsFailedAction>;

// GroupScreen
export type IGroupScreenActions =
  | ReturnType<typeof changeSearchLessonsNameAction>
  | ReturnType<typeof downloadLessonsAction>
  | ReturnType<typeof downloadLessonsSuccessAction>
  | ReturnType<typeof downloadLessonsFailedAction>;
