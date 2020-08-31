import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { mount } from "enzyme";

import { initialState } from "../../redux/store";

import {
  MainRightBarComponent,
  LabeledInputComponent,
  ButtonComponent,
} from "../../components";

describe("Main right bar tests", () => {
  const appReducer = (
    state = {
      ...initialState,
      groups: [
        { id: "1", title: "идб-18-07", lastUpdate: Date.now() },
        { id: "2", title: "идб-18-08", lastUpdate: Date.now() },
        { id: "3", title: "идб-18-09", lastUpdate: Date.now() },
      ],
    },
    action
  ) => {
    switch (action.type) {
      case "CREATE_GROUP_SUCCESS":
        console.log(1);
        return [...state, action.payload.group];
      default:
        return state;
    }
  };

  const tmpStore = createStore(appReducer);

  it("should return error about group is exist", () => {
    const wrapper = mount(
      <Provider store={tmpStore}>
        <MainRightBarComponent />
      </Provider>
    );

    expect(wrapper.find(LabeledInputComponent).length).toBe(1);
    expect(wrapper.find(LabeledInputComponent).prop("error")).toBe("");

    wrapper
      .find(LabeledInputComponent)
      .find("input")
      .simulate("change", { target: { value: "идб-18-07" } });
    wrapper.find(ButtonComponent).simulate("click");

    expect(wrapper.find(LabeledInputComponent).prop("error")).toBe(
      "Такая группа уже существует"
    );
  });

  it("should return error about group title is empty", () => {
    const wrapper = mount(
      <Provider store={tmpStore}>
        <MainRightBarComponent />
      </Provider>
    );

    expect(wrapper.find(LabeledInputComponent).length).toBe(1);
    expect(wrapper.find(LabeledInputComponent).prop("error")).toBe("");

    wrapper.find(ButtonComponent).simulate("click");

    expect(wrapper.find(LabeledInputComponent).prop("error")).toBe(
      "Введите название группы"
    );
  });
});
