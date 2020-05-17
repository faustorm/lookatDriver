import { LOCATION_CHANGED} from '../actions/types';
const INITIAL_STATE = {
  lat: '',
  lng: ''
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOCATION_CHANGED:
      return {...state, lat: action.payload.lat, lng: action.payload.lng};
    default:
      return state;
  }
};
