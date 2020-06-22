import { initialState } from "../redux/store";

export default (state = initialState.groups, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
