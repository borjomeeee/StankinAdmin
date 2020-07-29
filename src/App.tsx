import React from "react";
import { Provider } from "react-redux";

import "./static/styles/common.scss";

import { store } from "./redux/store";

import MainNavigation from "./navigation/Main";

// TODO

function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

export default App;
