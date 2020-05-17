import { DESTINATION_ZOOM } from '../actions/types';

export default (state = 1, action) => {
  switch(action.type) {
    case DESTINATION_ZOOM:
      state = action.payload
      return state;
    default:
      return state;
  }
};
