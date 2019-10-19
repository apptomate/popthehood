import API from './API.jsx';
import {
  LOGIN_URL,
  ALLVEHICLES_URL
} from '../../views/common/helpers/constants';
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  ALLVEHICLES_SUCCESS,
  ALLVEHICLES_LOADING,
  ALLVEHICLES_ERROR
} from './ActionTypes.jsx';
import { authHeader } from '../../views/common/helpers/functions.js';

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
