import { combineReducers, applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../saga/Root.saga";

import Group, { IGroup } from "../models/Group.model";
import Lesson, { ILesson } from "../models/Lesson.model";
import { LessonTime } from "../models/LessonTime.model";

import { TypeLessonType, TypeStudentGroup } from "../utils/enums";
import GroupsReducer from "../reducers/Groups.reducer";
import LessonsReducer from "../reducers/Lessons.reducer";

export const initialState = {
  app: {
    isConnection: false,
    isloading: false,

    error: "",
  },
  groups: new Array<IGroup>(),
  lessons: new Map<number, ILesson[]>(),
};

export type IAppInitialState = typeof initialState.app;
export type IGroupsInitialState = typeof initialState.groups;
export type ILessonsInitialState = typeof initialState.lessons;

initialState.groups = [
  new Group(1, "ИДБ-18-07"),
  new Group(2, "ИДБ-18-06"),
  new Group(3, "ИДБ-18-06"),
];

initialState.lessons.set(1, [
  new Lesson(
    1,
    "Технологии программирования",
    "Иванов Иван Иванович",
    TypeLessonType.LECTURE,
    [new Date(2020, 6, 23), new Date(2020, 6, 22), new Date(2020, 6, 21)],
    new LessonTime(1),
    "0101",
    TypeStudentGroup.NONE,
    1
  ),
  new Lesson(
    2,
    "Политология",
    "Саркисова Валерия Петровна",
    TypeLessonType.LAB,
    [new Date(2020, 5, 23), new Date(2020, 5, 22), new Date(2020, 5, 21)],
    new LessonTime(2),
    "0101",
    TypeStudentGroup.A,
    1
  ),
  new Lesson(
    3,
    "Архитектура ЭВМ",
    "Мурашкин Денис Дмитриевич",
    TypeLessonType.SEMINAR,
    [new Date(2020, 6, 1), new Date(2020, 6, 2), new Date(2020, 6, 3)],
    new LessonTime(3),
    "0101",
    TypeStudentGroup.B,
    1
  ),
]);

const reducers = combineReducers({
  groups: GroupsReducer,
  lessons: LessonsReducer,
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = createStore(reducers, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(rootSaga);
