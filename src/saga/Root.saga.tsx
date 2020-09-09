import { all } from "redux-saga/effects";

import groupsSaga from "./Groups.saga";
import lessonsSaga from "./Lessons.saga";
import appSaga from "./App.saga";

export const fetchAPI = async (url: string, key: string, data: object = {}) => {
  console.log(`${process.env.SERVER_URL}${url}`);
  const response = await fetch(`${process.env.SERVER_URL}${url}`, {
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
