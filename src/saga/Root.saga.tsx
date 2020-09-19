import { all } from "redux-saga/effects";

import groupsSaga from "./Groups.saga";
import lessonsSaga from "./Lessons.saga";
import appSaga from "./App.saga";



export const fetchAPI = async (url: string, key: string, data: object = {}) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_HOST}${url}`, {
    method: "POST",
    body: JSON.stringify({ key, ...data }),
  });

  const status = response.status;
  const resData = await response.json();

  return { status, data: resData["data"], message: resData["message"] };
};

export default function* rootSaga() {
  yield all([appSaga(), groupsSaga(), lessonsSaga()]);
}
