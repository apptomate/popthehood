import API from './API.jsx';
import {
  LOGIN_URL,
  ALLVEHICLES_URL,
  ALLUSERS_URL,
  USERVEHICLE_URL
} from '../../views/common/helpers/constants';
import { authHeader } from '../../views/common/helpers/functions.js';
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  ALLVEHICLES_SUCCESS,
  ALLVEHICLES_LOADING,
  ALLVEHICLES_ERROR,
  ALLUSERS_SUCCESS,
  ALLUSERS_ERROR,
  ALLUSERS_LOADING,
  USERVEHICLE_SUCCESS,
  USERVEHICLE_ERROR,
  USERVEHICLE_LOADING
} from './ActionTypes.jsx';

//Login
//User Authentication
export function authLogin(formData) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });
    API.post(LOGIN_URL, formData)
      .then(response => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data
        });
      })
      .catch(function(error) {
        if (error.response.data.error) {
          dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data
          });
        }
      });
  };
}

//Users
//Get All Users
export function getAllUsers() {
  return dispatch => {
    dispatch({
      type: ALLUSERS_LOADING
    });
    API.get(ALLUSERS_URL, { headers: authHeader() })
      .then(response => {
        dispatch({
          type: ALLUSERS_SUCCESS,
          payload: response.data
        });
      })
      .catch(function(error) {
        if (error.response) {
          dispatch({
            type: ALLUSERS_ERROR,
            payload: error.response.data
          });
        }
      });
  };
}
//Users's Vehicle Details
export function getUserVehicleDetails(data) {
  return dispatch => {
    dispatch({
      type: USERVEHICLE_LOADING
    });
    API.get(USERVEHICLE_URL, { headers: authHeader(), params: data })
      .then(response => {
        dispatch({
          type: USERVEHICLE_SUCCESS,
          payload: response.data
        });
      })
      .catch(function(error) {
        if (error.response.data.error) {
          dispatch({
            type: USERVEHICLE_ERROR,
            payload: error.response.data
          });
        }
      });
  };
}

export function getAllVehicles() {
  return dispatch => {
    dispatch({
      type: ALLVEHICLES_LOADING
    });
    API.get(ALLVEHICLES_URL, {
      headers: authHeader()
    })
      .then(response => {
        dispatch({
          type: ALLVEHICLES_SUCCESS,
          payload: response.data
        });
      })
      .catch(function(error) {
        dispatch({
          type: ALLVEHICLES_ERROR,
          payload: error.response.data
        });
      });
  };
}
