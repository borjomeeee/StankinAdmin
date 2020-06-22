import { combineReducers, applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../saga/Root.saga";

export const initialState = {
  groups: [],
  lessons: new Map<number, []>(),
};

const reducers = combineReducers([]);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = createStore(reducers, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(rootSaga);

// render the application
