import Index from 'views/Index.jsx';
import Users from 'views/users/Users';
import listVehicle from 'views/listVehicle.jsx';
import serviceListpage from 'views/serviceListpage.jsx';
import paymentReport from 'views/paymentReport.jsx';
import servicesReport from 'views/servicesReport.jsx';
import Register from 'views/examples/Register.jsx';
import Login from 'views/login/Login.jsx';
import ListVehicle from 'views/vehicle/ListVehicle.jsx';
import ViewVehicle from './views/vehicle/ViewVehicle';
import ListService from './views/service/ListService';
import vehicleServicepage from './views/vehicleServiceDetails/vehicleServicepage';
var routes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: Index,
    layout: '/admin',
    showNavbar: true
  },
  {
    path: '/users',
    name: 'Users',
    icon: 'ni ni-circle-08 text-primary',
    component: Users,
    layout: '/admin',
    showNavbar: true
  },

  {
    path: '/list-of-vehicle',
    name: 'List of vehicle',
    icon: 'ni ni-collection text-primary',
    component: ListVehicle,
    layout: '/admin',
    showNavbar: true
  },

  {
    path: '/service-list',
    name: 'Available Services',
    icon: 'fas fa-stream text-primary',
    component: ListService,
    layout: '/admin',
    showNavbar: true
  },

  {
    path: '/payment-report',
    name: 'Payment Report',
    icon: 'ni ni-credit-card text-primary',
    component: paymentReport,
    layout: '/admin',
    showNavbar: true
  },

  {
    path: '/services-report',
    name: 'Services Report',
    icon: 'ni ni-chart-bar-32 text-primary',
    component: servicesReport,
    layout: '/admin',
    showNavbar: true
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-primary',
    component: Login,
    layout: '/auth',
    showNavbar: false
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-circle-08 text-primary',
    component: Register,
    layout: '/auth',
    showNavbar: false
  },
  {
    path: '/viewvehicle/:id',
    name: 'View Vehicle',
    icon: 'ni ni-circle-08 text-primary',
    component: ViewVehicle,
    layout: '/admin',
    showNavbar: false
  },
  {
    path: '/vehicle-service-details/:id',
    name: 'Vehicle Service',
    icon: 'ni ni-circle-08 text-primary',
    component: vehicleServicepage,
    layout: '/admin',
    showNavbar: false
  }
];
export default routes;
