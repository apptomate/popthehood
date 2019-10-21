import Index from 'views/Index.jsx';
import Users from 'views/Users.jsx';
import listVehicle from 'views/listVehicle.jsx';
import serviceListpage from 'views/serviceListpage.jsx';
import paymentReport from 'views/paymentReport.jsx';
import servicesReport from 'views/servicesReport.jsx';
import vehicleServicepage from 'views/vehicleServicepage.jsx';
import Register from 'views/examples/Register.jsx';
import Login from 'views/examples/Login.jsx';

var routes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: Index,
    layout: '/admin'
  },
  {
    path: '/users',
    name: 'Users',
    icon: 'ni ni-circle-08 text-primary',
    component: Users,
    layout: '/admin'
  },

  {
    path: '/list-of-vehicle',
    name: 'List of vehicle',
    icon: 'ni ni-collection text-primary',
    component: listVehicle,
    layout: '/admin'
  },

  {
    path: '/service-list',
    name: 'Service List Page',
    icon: 'fas fa-stream text-primary',
    component: serviceListpage,
    layout: '/admin'
  },

  {
    path: '/payment-report',
    name: 'Payment Report',
    icon: 'ni ni-credit-card text-primary',
    component: paymentReport,
    layout: '/admin'
  },

  {
    path: '/services-report',
    name: 'Services Report',
    icon: 'ni ni-chart-bar-32 text-primary',
    component: servicesReport,
    layout: '/admin'
  },

  {
    path: '/vehicle-service',
    name: 'Vehicle Service Page',
    icon: 'ni ni-circle-08 text-primary',
    component: vehicleServicepage,
    layout: '/admin'
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-primary',
    component: Login,
    layout: '/auth'
  },

  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-circle-08 text-primary',
    component: Register,
    layout: '/auth'
  }
];
export default routes;
