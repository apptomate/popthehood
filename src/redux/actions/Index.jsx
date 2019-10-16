import API from './API.jsx';
import { LOGIN_URL } from '../../views/common/helpers/constants';
import { LOGIN_SUCCESS } from './ActionTypes.jsx';

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
        console.error(error);
      });
  };
}
