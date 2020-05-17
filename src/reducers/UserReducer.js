import { USER_ENTERED } from '../actions/types';
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case USER_ENTERED:
      state = action.payload
      return state;
    default:
      return state;
  }
};
