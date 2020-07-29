import React from "react";
import { createStore } from "redux";
import { shallow } from "enzyme";
import { Provider } from "react-redux";

import { initialState } from "../../redux/store";

import MainScreen from "../../screens/Main";

import EditRemoveHOC from "../../templates/EditRemove";

describe("Main screen tests", () => {
  it("should view list groups", () => {
    // const appReducer = (
    //   state = {
    //     ...initialState,
    //     groups: [
    //       { id: "1", title: "Первая группа", lastUpdate: Date.now() },
    //       { id: "2", title: "Вторая группа", lastUpdate: Date.now() },
    //       { id: "3", title: "Третья группа", lastUpdate: Date.now() },
    //     ],
    //   },
    //   action
    // ) => {
    //   switch (action.type) {
    //     default:
    //       return state;
    //   }
    // };

    // const tmpStore = createStore(appReducer);

    // const wrapper = shallow(
    //   <Provider store={tmpStore}>
    //     <MainScreen />
    //   </Provider>
    // );

    // expect(wrapper.find(EditRemoveHOC).length).toBe(3);
  });
});
