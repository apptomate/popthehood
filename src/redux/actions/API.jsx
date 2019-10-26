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
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      if (!window.location.href.includes('login')) {
        window.location.replace('/login');
      }
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
