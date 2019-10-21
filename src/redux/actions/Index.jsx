import API from './API.jsx';
import {
  LOGIN_URL,
  ALLVEHICLES_URL,
  ALLUSERS_URL,
  USERVEHICLE_URL,
  DELETEVEHICLE_URL,
  VEHICLEBYVEHICLEID_URL,
  ALLSERVICES_URL,
  ALLSERVICEPLANS_URL,
  GETSERVICEPRICEBYID_URL
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
  USERVEHICLE_LOADING,
  DELETEVEHICLE_LOADING,
  DELETEVEHICLE_SUCCESS,
  DELETEVEHICLE_ERROR,
  VEHICLEBYVEHICLEID_LOADING,
  VEHICLEBYVEHICLEID_SUCCESS,
  VEHICLEBYVEHICLEID_ERROR,
  ALLSERVICES_LOADING,
  ALLSERVICES_SUCCESS,
  ALLSERVICES_ERROR,
  ALLSERVICEPLANS_LOADING,
  ALLSERVICEPLANS_SUCCESS,
  ALLSERVICEPLANS_ERROR,
  GETSERVICEPRICEBYID_LOADING,
  GETSERVICEPRICEBYID_SUCCESS,
  GETSERVICEPRICEBYID_ERROR
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

export function deleteVehicle(vehicleID) {
  return dispatch => {
    dispatch({
      type: DELETEVEHICLE_LOADING
    });
    API.delete(DELETEVEHICLE_URL + '/' + vehicleID, {
      headers: authHeader()
    })
      .then(response => {
        dispatch({
          type: DELETEVEHICLE_SUCCESS,
          payload: response.data
        });
        dispatch(getAllVehicles());
      })
      .catch(function(error) {
        dispatch({
          type: DELETEVEHICLE_ERROR,
          payload: error.response.data
        });
      });
  };
}

export function vehiclesByVehicleID(vehicleID) {
  return dispatch => {
    dispatch({
      type: VEHICLEBYVEHICLEID_LOADING
    });
    API.get(VEHICLEBYVEHICLEID_URL + '/' + vehicleID, {
      headers: authHeader()
    })
      .then(response => {
        dispatch({
          type: VEHICLEBYVEHICLEID_SUCCESS,
          payload: response.data
        });
      })
      .catch(function(error) {
        dispatch({
          type: VEHICLEBYVEHICLEID_ERROR,
          payload: error.response.data
        });
      });
  };
}

export function getAllServices() {
  return dispatch => {
    dispatch({
      type: ALLSERVICES_LOADING
    });
    API.get(ALLSERVICES_URL, {
      headers: authHeader()
    })
      .then(response => {
        dispatch({
          type: ALLSERVICES_SUCCESS,
          payload: response.data
        });
      })
      .catch(function(error) {
        dispatch({
          type: ALLSERVICES_ERROR,
          payload: error.response.data
        });
      });
  };
}

export function getAllServicePlans() {
  return dispatch => {
    dispatch({
      type: ALLSERVICEPLANS_LOADING
    });
    API.get(ALLSERVICEPLANS_URL, {
      headers: authHeader()
    })
      .then(response => {
        dispatch({
          type: ALLSERVICEPLANS_SUCCESS,
          payload: response.data
        });
      })
      .catch(function(error) {
        dispatch({
          type: ALLSERVICEPLANS_ERROR,
          payload: error.response.data
        });
      });
  };
}

export function getServicePriceByID(id) {
  return dispatch => {
    dispatch({
      type: GETSERVICEPRICEBYID_LOADING
    });
    API.get(GETSERVICEPRICEBYID_URL + '/' + id, {
      headers: authHeader()
    })
      .then(response => {
        dispatch({
          type: GETSERVICEPRICEBYID_SUCCESS,
          payload: response.data
        });
      })
      .catch(function(error) {
        dispatch({
          type: GETSERVICEPRICEBYID_ERROR,
          payload: error.response.data
        });
      });
  };
}
