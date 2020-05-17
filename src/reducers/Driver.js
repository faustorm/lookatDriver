import { DRIVER, DRIVER_OCCUPIED } from '../actions/types';
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case DRIVER:
      state = action.payload
      return state;
    case DRIVER_OCCUPIED:
      return {...state, available: action.payload};
    default:
      return state;
  }
};
