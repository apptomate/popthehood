import Axios from 'axios';
const API = Axios.create();
API.interceptors.response.use(
  response => {
    if (response.data && response.data.success === false) {
      return Promise.reject({ error: true, response: response });
    }
    return response;
  },
  error => {
    if (401 === error.response && error.response.status) {
      localStorage.clear();
    }
    if (
      error.response &&
      error.response.data &&
      error.response.data.success === false
    ) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);
export default API;
