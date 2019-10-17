import API from './API.jsx';
import { LOGIN_URL } from '../../views/common/helpers/constants';
import { LOGIN_SUCCESS, LOGIN_ERROR } from './ActionTypes.jsx';

export function authLogin(formData) {
  return dispatch => {
    API.post(LOGIN_URL, formData)
      .then(response => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data
        });
      })
      .catch(function(error) {
        if (error.response && error.response.data.status === 'Error') {
          dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data
          });
        }
      });
  };
}
