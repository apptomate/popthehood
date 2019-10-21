import { combineReducers } from 'redux';
import authLogin from './authreducers/LoginReducer';
import getUserVehicleDetails from './usersReducers/GetUsersVehicleDetailsReducer';
import getAllUsers from './usersReducers/GetAllUsersReducer';
import updateUser from './usersReducers/PutUserReducer';
import deleteUser from './usersReducers/DeleteUserReducer';
import updateVehicle from './vehicleReducers/PutVehicleReducer';
import deleteVehicle from './vehicleReducers/DeleteVehicleReducer';
import vehicleByVehicleID from './vehicleReducers/VehicleByVehicleIDReducer';
import allServices from './servicereducers/AllServicesReducer';
import allVehicles from './vehicleReducers/AllVehiclesReducer';

const RootReducer = combineReducers({
  authLogin: authLogin,
  getAllUsers: getAllUsers,
  getUserVehicleDetails: getUserVehicleDetails,
  updateUser: updateUser,
  deleteUser: deleteUser,
  updateVehicle: updateVehicle,
  getAllVehicles: allVehicles,
  deleteVehicle: deleteVehicle,
  vehicleByVehicleID: vehicleByVehicleID,
  getAllServices: allServices
});

export default RootReducer;
