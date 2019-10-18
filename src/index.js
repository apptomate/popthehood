import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import 'assets/vendor/nucleo/css/nucleo.css';
import 'assets/vendor/@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/scss/popTheHood-dashboard-react.scss';

import AdminLayout from 'layouts/Admin.jsx';
import AuthLayout from 'layouts/Auth.jsx';

import { Provider } from 'react-redux';
import configureStore from '../src/redux/store/ConfigureStore.jsx';
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/auth' render={props => <AuthLayout {...props} />} />
        <Route path='/admin' render={props => <AdminLayout {...props} />} />
        <Redirect from='/' to='/auth/login' />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
