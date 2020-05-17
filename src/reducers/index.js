import { combineReducers } from 'redux';
import LocationReducer from './LocationReducer';
import UserReducer from './UserReducer';
import Driver from './Driver';
import CourseTrip from './CourseTrip';
import ActualTrip from './ActualTrip';
import DestinationZoom from './DestinationZoom';

export default combineReducers({
  location: LocationReducer,
  user: UserReducer,
  actualTrip: ActualTrip,
  courseTrips: CourseTrip,
  driver: Driver,
  destinationZoom: DestinationZoom
});
