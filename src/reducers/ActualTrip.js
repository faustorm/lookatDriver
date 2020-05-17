import { ACTUAL_TRIP } from '../actions/types';
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ACTUAL_TRIP:
      newState = action.payload
      return action.payload;
    default:
      return state;
  }
};
