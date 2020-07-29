import React from "react";
import { createStore } from "redux";
import { mount } from "enzyme";
import { Provider } from "react-redux";

// import Enzyme from "enzyme";
// import Adapter from "enzyme-adapter-react-16";

import { initialState } from "../../redux/store";

import {
  ButtonComponent,
  EditGroupModalComponent,
  LabeledInputComponent,
} from "../../components";

// Enzyme.configure({ adapter: new Adapter() });

describe("Edit group modal", () => {
  const appReducer = (
    state = {
      ...initialState,
      groups: [
        { id: "1", title: "Первая группа", lastUpdate: Date.now() },
        { id: "2", title: "Вторая группа", lastUpdate: Date.now() },
        { id: "3", title: "Третья группа", lastUpdate: Date.now() },
      ],
    },
    action
  ) => {
    switch (action.type) {
      default:
        return state;
    }
  };

  const tmpStore = createStore(appReducer);

  it("should view modal with group props", () => {
    const wrapper = mount(
      <Provider store={tmpStore}>
        <EditGroupModalComponent
          group={{ id: "1", title: "Первая группа", lastUpdate: Date.now() }}
          onClose={jest.fn()}
        />
      </Provider>
    );

    expect(wrapper.find(LabeledInputComponent).length).toBe(1);
    expect(wrapper.find(LabeledInputComponent).prop("value")).toBe(
      "Первая группа"
    );
  });

  it("should view error about what group name length should be more than 0", () => {
    const wrapper = mount(
      <Provider store={tmpStore}>
        <EditGroupModalComponent
          group={{ id: "1", title: "Первая группа", lastUpdate: Date.now() }}
          onClose={jest.fn()}
        />
      </Provider>
    );

    expect(wrapper.find(LabeledInputComponent).length).toBe(1);

    wrapper.find("input").simulate("change", { target: { value: "" } });

    wrapper.find(ButtonComponent).simulate("click");

    expect(wrapper.find(LabeledInputComponent).prop("error")).toBe(
      "Введите название группы"
    );
  });

  it("should view error about what this group is exist", () => {
    const wrapper = mount(
      <Provider store={tmpStore}>
        <EditGroupModalComponent
          group={{ id: "1", title: "Первая группа", lastUpdate: Date.now() }}
          onClose={jest.fn()}
        />
      </Provider>
    );

    expect(wrapper.find(LabeledInputComponent).length).toBe(1);

    wrapper
      .find("input")
      .simulate("change", { target: { value: "Вторая группа" } });

    wrapper.find(ButtonComponent).simulate("click");

    expect(wrapper.find(LabeledInputComponent).prop("error")).toBe(
      "Такая группа уже существует"
    );
  });

  it("should view error about what this group title is incorrect", () => {
    const wrapper = mount(
      <Provider store={tmpStore}>
        <EditGroupModalComponent
          group={{ id: "1", title: "Первая группа", lastUpdate: Date.now() }}
          onClose={jest.fn()}
        />
      </Provider>
    );

    expect(wrapper.find(LabeledInputComponent).length).toBe(1);

    wrapper
      .find("input")
      .simulate("change", { target: { value: "Рандомное название группы" } });

    wrapper.find(ButtonComponent).simulate("click");

    expect(wrapper.find(LabeledInputComponent).prop("error")).toBe(
      "Шаблон группы ИДБ-01-01"
    );
  });
});
