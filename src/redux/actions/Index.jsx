import API from './API.jsx';
import { LOGIN_URL } from '../../views/common/helpers/constants';
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_LOADING } from './ActionTypes.jsx';

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
