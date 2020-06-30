import React from "react";
import { Provider } from "react-redux";

import "./static/styles/common.scss";

import { store } from "./redux/store";

import MainNavigation from "./navigation/Main.navigation";

// TODO
// Сделать страницу авторизации через ключ
// (ключ хранится в сторе и отправляется с каждым запросом)

// Отключить все важные функции при загрузке

function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

export default App;
