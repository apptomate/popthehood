import { combineReducers } from 'redux';
import authLogin from './authreducers/LoginReducer';
import getAllVehicles from './vehicleReducers/AllVehiclesReducer';
import getUserVehicleDetails from './usersReducers/GetUsersVehicleDetailsReducer';
import getAllUsers from './usersReducers/GetAllUsersReducer';
import deleteVehicle from './vehicleReducers/DeleteVehicleReducer';
import vehicleByVehicleID from './vehicleReducers/VehicleByVehicleIDReducer';
import getAllServices from './servicereducers/AllServicesReducer';
import getAllServicePlans from './servicereducers/AllServicePlansReducer';
import getServicePriceByID from './servicereducers/GetServicePriceByIDReducer';
import updateUser from './usersReducers/PutUserReducer';
import deleteUser from './usersReducers/DeleteUserReducer';
import updateVehicle from './vehicleReducers/PutVehicleReducer';
import vehicleServiceDetails from './vehicleReducers/GetVehicleServiceDetailsReducer';

const RootReducer = combineReducers({
  authLogin: authLogin,
  getAllUsers: getAllUsers,
  getUserVehicleDetails: getUserVehicleDetails,
  updateUser: updateUser,
  deleteUser: deleteUser,
  updateVehicle: updateVehicle,
  deleteVehicle: deleteVehicle,
  vehicleByVehicleID: vehicleByVehicleID,
  getAllVehicles: getAllVehicles,
  getAllServices: getAllServices,
  getAllServicePlans: getAllServicePlans,
  getServicePriceByID: getServicePriceByID,
  vehicleServiceDetails: vehicleServiceDetails
});

export default RootReducer;
