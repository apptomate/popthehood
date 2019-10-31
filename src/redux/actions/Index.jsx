import API from './API.jsx';
import {
  LOGIN_URL,
  ALLVEHICLES_URL,
  ALLUSERS_URL,
  USERVEHICLE_URL,
  DELETEVEHICLE_URL,
  ALLSERVICES_URL,
  ALLSERVICEPLANS_URL,
  GETSERVICEPRICEBYID_URL,
  UPDATE_DELETE_USER_URL,
  UPDATEVEHICLE_URL,
  SERVICEREPORT_URL,
  UPDATEVEHICLESERVICE_URL,
  VEHICLESERVICEDETAILS_URL,
  DASHBOARD_URL
} from '../../views/common/helpers/constants';
import { authHeader } from '../../views/common/helpers/functions.jsx';
import {
  ALLUSERS_SUCCESS,
  ALLUSERS_ERROR,
  ALLUSERS_LOADING,
  USERVEHICLE_SUCCESS,
  USERVEHICLE_ERROR,
  USERVEHICLE_LOADING,
  UPDATEUSER_SUCCESS,
  UPDATEUSER_ERROR,
  DELETEUSER_SUCCESS,
  DELETEUSER_ERROR,
  UPDATEVEHICLE_SUCCESS,
  UPDATEVEHICLE_ERROR,
  ALLVEHICLES_SUCCESS,
  ALLVEHICLES_LOADING,
  ALLVEHICLES_ERROR,
  DELETEVEHICLE_LOADING,
  DELETEVEHICLE_SUCCESS,
  DELETEVEHICLE_ERROR,
  ALLSERVICES_LOADING,
  ALLSERVICES_SUCCESS,
  ALLSERVICES_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  ALLSERVICEPLANS_LOADING,
  ALLSERVICEPLANS_SUCCESS,
  ALLSERVICEPLANS_ERROR,
  GETSERVICEPRICEBYID_LOADING,
  GETSERVICEPRICEBYID_SUCCESS,
  GETSERVICEPRICEBYID_ERROR,
  GETSERVICEREPORT_LOADING,
  GETSERVICEREPORT_SUCCESS,
  GETSERVICEREPORT_ERROR,
  VEHICLESERVICEDETAILS_SUCCESS,
  VEHICLESERVICEDETAILS_ERROR,
  UPDATEVEHICLESERVICE_LOADING,
  UPDATEVEHICLESERVICE_SUCCESS,
  UPDATEVEHICLESERVICE_ERROR,
  DASHBOARD_LOADING,
  DASHBOARD_SUCCESS,
  DASHBOARD_ERROR
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
        if (error.response) {
          dispatch({
            type: LOGIN_ERROR,
            payload: error.response
          });
        }
      });
  };
}

//Update User
export function updateUser(data) {
  return dispatch => {
    dispatch({
      type: ALLUSERS_LOADING
    });
    API.put(UPDATE_DELETE_USER_URL, data, { headers: authHeader() })
      .then(response => {
        dispatch({
          type: UPDATEUSER_SUCCESS,
          payload: response.data
        });
        dispatch(getAllUsers());
      })
      .catch(function(error) {
        if (error.response) {
          dispatch({
            type: UPDATEUSER_ERROR,
            payload: error.response
          });
        }
      });
  };
}
//Delete User
export function deleteUser(user_id) {
  return dispatch => {
    dispatch({
      type: ALLUSERS_LOADING
    });
    API.delete(UPDATE_DELETE_USER_URL + '/' + user_id, {
      headers: authHeader()
    })
      .then(response => {
        dispatch({
          type: DELETEUSER_SUCCESS,
          payload: response.data
        });
        dispatch(getAllUsers());
      })
      .catch(function(error) {
        if (error.response) {
          dispatch({
            type: DELETEUSER_ERROR,
            payload: error.response
          });
        }
      });
  };
}

//Update Vehicle
export function updateVehicle(data, from = '') {
  return dispatch => {
    dispatch({
      type: USERVEHICLE_LOADING
    });
    API.put(UPDATEVEHICLE_URL, data, { headers: authHeader() })
      .then(response => {
        dispatch({
          type: UPDATEVEHICLE_SUCCESS,
          payload: response.data
        });
        var get_data = { userId: data.userId };
        if (from === 'vehicle') {
          dispatch(getAllVehicles());
        } else {
          dispatch(getUserVehicleDetails(get_data));
        }
      })
      .catch(function(error) {
        if (error.response) {
          dispatch({
            type: UPDATEVEHICLE_ERROR,
            payload: error.response
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
            payload: error.response
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
        if (error.response) {
          dispatch({
            type: USERVEHICLE_ERROR,
            payload: error.response
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
        if (error.response) {
          dispatch({
            type: ALLVEHICLES_ERROR,
            payload: error.response
          });
        }
      });
  };
}

export function deleteVehicle(vehicleID, from = '', user_id) {
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
        var get_data = { userId: user_id };
        if (from === 'vehicle') {
          dispatch(getAllVehicles());
        } else {
          dispatch(getAllUsers());
          dispatch(getUserVehicleDetails(get_data));
        }
      })
      .catch(function(error) {
        if (error.response) {
          dispatch({
            type: DELETEVEHICLE_ERROR,
            payload: error.response
          });
        }
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
        if (error.response) {
          dispatch({
            type: ALLSERVICES_ERROR,
            payload: error.response
          });
        }
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
        if (error.response) {
          dispatch({
            type: ALLSERVICEPLANS_ERROR,
            payload: error.response
          });
        }
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
        if (error.response) {
          dispatch({
            type: GETSERVICEPRICEBYID_ERROR,
            payload: error.response
          });
        }
      });
  };
}

export function getServiceReport() {
  return dispatch => {
    dispatch({
      type: GETSERVICEREPORT_LOADING
    });
    API.get(SERVICEREPORT_URL, {
      headers: authHeader()
    })
      .then(response => {
        dispatch({
          type: GETSERVICEREPORT_SUCCESS,
          payload: response.data
        });
      })
      .catch(function(error) {
        if (error.response) {
          dispatch({
            type: GETSERVICEREPORT_ERROR,
            payload: error.response
          });
        }
      });
  };
}

//Vehicle Service Details
export function vehicleServiceDetails(data) {
  return dispatch => {
    API.get(VEHICLESERVICEDETAILS_URL, { headers: authHeader(), params: data })
      .then(response => {
        dispatch({
          type: VEHICLESERVICEDETAILS_SUCCESS,
          payload: response.data
        });
      })
      .catch(function(error) {
        if (error.response) {
          dispatch({
            type: VEHICLESERVICEDETAILS_ERROR,
            payload: error.response
          });
        }
      });
  };
}

export function dashboard() {
  return dispatch => {
    dispatch({
      type: DASHBOARD_LOADING
    });
    API.get(DASHBOARD_URL, {
      headers: authHeader()
    })
      .then(response => {
        dispatch({
          type: DASHBOARD_SUCCESS,
          payload: response.data
        });
      })
      .catch(function(error) {
        if (error.response) {
          dispatch({
            type: DASHBOARD_ERROR,
            payload: error.response
          });
        }
      });
  };
}

//Update Vehicle Details
export function updateVehicleService(data, reload_date) {
  return dispatch => {
    dispatch({
      type: UPDATEVEHICLESERVICE_LOADING,
      payload: ''
    });
    API.put(UPDATEVEHICLESERVICE_URL, data, { headers: authHeader() })
      .then(response => {
        dispatch({
          type: UPDATEVEHICLESERVICE_SUCCESS,
          payload: response.data
        });
        dispatch(vehicleServiceDetails(reload_date));
      })
      .catch(function(error) {
        if (error.response) {
          dispatch({
            type: UPDATEVEHICLESERVICE_ERROR,
            payload: error.response.data
          });
        }
      });
  };
}
