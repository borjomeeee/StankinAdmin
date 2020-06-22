import { initialState } from "../redux/store";

export default (state = initialState.lessons, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
