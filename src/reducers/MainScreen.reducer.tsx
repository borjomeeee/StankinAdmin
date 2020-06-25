import { initialState } from '../redux/store'

export default (state = initialState.mainScreen, action: any) => {
  switch(action.type) {
    default:
      return state;
  }
}