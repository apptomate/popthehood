import API from './API.jsx';
import {
    LOGIN_URL,
    ALLUSERS_URL,
    USERVEHICLE_URL,
    UPDATE_DELETE_USER_URL,
    UPDATEVEHICLE_URL
} from '../../views/common/helpers/constants';
import { authHeader } from '../../views/common/helpers/functions.js';
import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_LOADING,
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
    UPDATEVEHICLE_ERROR
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
                        payload: error.response.data
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
                console.error('Res:/', response.data);
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
                if (error.response) {
                    dispatch({
                        type: USERVEHICLE_ERROR,
                        payload: error.response.data
                    });
                }
            });
    };
}

//Update Vehicle
export function updateVehicle(data) {
    return dispatch => {
        dispatch({
            type: USERVEHICLE_LOADING
        });
        API.put(UPDATEVEHICLE_URL, data, { headers: authHeader() })
            .then(response => {
                console.error('Rs:/', response);
                dispatch({
                    type: UPDATEVEHICLE_SUCCESS,
                    payload: response.data
                });
                var get_data = { userId: data.userId };
                dispatch(getUserVehicleDetails(get_data));
            })
            .catch(function(error) {
                if (error.response) {
                    dispatch({
                        type: UPDATEVEHICLE_ERROR,
                        payload: error.response.data
                    });
                }
            });
    };
}
