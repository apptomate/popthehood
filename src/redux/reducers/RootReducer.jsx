import { combineReducers } from 'redux';
import authLogin from './authreducers/LoginReducer';
import getAllVehicles from './vehicleReducers/AllVehiclesReducer';
import getUserVehicleDetails from './usersReducers/GetUsersVehicleDetailsReducer';
import getAllUsers from './usersReducers/GetAllUsersReducer';
import deleteVehicle from './vehicleReducers/DeleteVehicleReducer';
import vehicleByVehicleID from './vehicleReducers/VehicleByVehicleIDReducer';
import getAllServices from './servicereducers/AllServicesReducer';
import getAllServicePlans from './servicereducers/AllServicePlansReducer';
import { getServicePriceByID } from '../actions/Index';
import updateUser from './usersReducers/PutUserReducer';
import deleteUser from './usersReducers/DeleteUserReducer';
import updateVehicle from './vehicleReducers/PutVehicleReducer';

const RootReducer = combineReducers({
  authLogin: authLogin,
  getAllUsers: getAllUsers,
  getUserVehicleDetails: getUserVehicleDetails,
  getAllVehicles: getAllVehicles,
  deleteVehicle: deleteVehicle,
  vehicleByVehicleID: vehicleByVehicleID,
  getAllServices: getAllServices,
  getAllServicePlans: getAllServicePlans,
  getServicePriceByID: getServicePriceByID,
  updateUser: updateUser,
  deleteUser: deleteUser,
  updateVehicle: updateVehicle
});

export default RootReducer;
