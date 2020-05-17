import { LOCATION_CHANGED, ACTUAL_TRIP, COMPLETED_TRIP, PUSH_TRIP, PUSH_TRIPS, USER_ENTERED, COURSE_TRIP, DRIVER, DRIVER_OCCUPIED, DESTINATION_ZOOM, CLEAN_ACTUAL } from './types';

export const locationChanged = ({latitude, longitude}) => {
  return {
    type: LOCATION_CHANGED,
    payload: {
      lat: latitude,
      lng: longitude
    }
  };
};

export const userEntered = (payload) => {
  return {
    type: USER_ENTERED,
    payload: payload
  };
};

export const loadTrips = (payload) => {
    return{
      type: PUSH_TRIPS,
      payload: payload
    }
};

export const completedTrip = (payload) => {
    return{
      type: COMPLETED_TRIP,
      payload: payload
    }
};

export const actualTrip = (payload) => {
    return{
      type: ACTUAL_TRIP,
      payload: payload
    }
};

export const onCourseTrip = (payload) => {
    return{
      type: PUSH_TRIP,
      payload: payload
    }
};

export const cleanActual = (payload) => {
  return{
    type: CLEAN_ACTUAL
  }
};

export const driverEntered = (payload) => {
    return{
      type: DRIVER,
      payload: payload
    };

};

export const driverOccupied = (payload) => {
  return (dispatch) => {
    dispatch({
      type: DRIVER_OCCUPIED,
      payload: payload
    })
  };
};

export const selectDestination = (payload) => {
  return (dispatch) => {
    dispatch({
      type: DESTINATION_ZOOM,
      payload: payload
    })
  };
};
