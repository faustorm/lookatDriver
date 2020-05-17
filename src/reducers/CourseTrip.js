import { PUSH_TRIP, PUSH_TRIPS, CLEAN_ACTUAL, COMPLETED_TRIP } from '../actions/types';
const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case PUSH_TRIPS:
      newState = action.payload
      return action.payload;
    case PUSH_TRIP:
      newState = [...state, action.payload]
      return newState;
    case COMPLETED_TRIP:
      newState = [...state]
      for(i = 0; i < newState.length; i++){
        if(newState[i].idTrip === action.payload) {
          newState.splice(i, 1);
        }
      }
      return newState
    default:
      return state;
  }
};
