import { changeSearchGroupNameAction } from "../actions/MainScreen.actions";

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
  | ReturnType<typeof downloadGroupsFailedAction>;

// Groups
export type IGroupsActions =
  | ReturnType<typeof downloadGroupsAction>
  | ReturnType<typeof downloadGroupsSuccessAction>
  | ReturnType<typeof downloadGroupsFailedAction>;

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
