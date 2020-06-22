import React from "react";
import { Provider } from "react-redux";

import "./static/styles/common.scss";

import { store } from "./redux/store";

import MainNavigation from "./navigation/Main.navigation";

function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

export default App;
