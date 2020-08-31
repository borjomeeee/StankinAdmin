import { all } from "redux-saga/effects";

import groupsSaga from "./Groups.saga";
import lessonsSaga from "./Lessons.saga";
import appSaga from "./App.saga";

import config from "./config/config.json";

export const fetchAPI = async (url: string, key: string, data: object = {}) => {
  console.log(`${config.host}${url}`);
  const response = await fetch(`${config.host}${url}`, {
    method: "POST",
    body: JSON.stringify({ key, ...data }),
  });

  const status = response.status;
  const resData = await response.json();

  return { status, data: resData };
};

export default function* rootSaga() {
  yield all([appSaga(), groupsSaga(), lessonsSaga()]);
}
