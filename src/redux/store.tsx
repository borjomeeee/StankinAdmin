import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../saga/Root.saga";

import { IGroup } from "../models/Group.model";
import { ILesson } from "../models/Lesson.model";

import { FilterValuesGroupType } from "../utils/enums";

import GroupsReducer from "../reducers/Groups.reducer";
import LessonsReducer from "../reducers/Lessons.reducer";
import GroupScreenReducer from "../reducers/GroupScreen.reducer";
import MainScreenReducer from "../reducers/MainScreen.reducer";
import AppReducer from "../reducers/App.reducer";

export const initialState = {
  app: {
    isAuth: false,
    appKey: "",

    isLoading: false,

    error: "",
  },
  groups: new Array<IGroup>(),
  lessons: new Map<string, ILesson[]>(),

  mainScreen: {
    typeGroupFilter: FilterValuesGroupType.ALL,
    searchGroupText: "",
  },
  groupScreen: {
    searchLessonText: "",
  },
};

export type IInitialState = typeof initialState;
export type IAppInitialState = typeof initialState.app;
export type IGroupsInitialState = typeof initialState.groups;
export type ILessonsInitialState = typeof initialState.lessons;
export type IMainScreenInitialState = typeof initialState.mainScreen;
export type IGroupScreenInitialState = typeof initialState.groupScreen;

const reducers = combineReducers({
  app: AppReducer,
  groups: GroupsReducer,
  lessons: LessonsReducer,

  mainScreen: MainScreenReducer,
  groupScreen: GroupScreenReducer,
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// then run the saga
sagaMiddleware.run(rootSaga);
