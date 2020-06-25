import { combineReducers, applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../saga/Root.saga";
import { IGroup } from "../screens/Main.screen";
import { ILesson } from "../screens/Group.screen";

export const initialState = {
  app: {
    isConnection: false,
    isloading: false,

    error: "",
  },
  groups: new Array<IGroup>(),
  lessons: new Map<number, ILesson[]>(),
};

const reducers = combineReducers([]);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = createStore(reducers, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(rootSaga);

// render the application
