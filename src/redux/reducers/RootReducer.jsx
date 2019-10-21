import { combineReducers } from 'redux';
import authLogin from './authreducers/LoginReducer';
import allVehicles from './vehiclereducers/AllVehiclesReducer';
import getUserVehicleDetails from './usersReducers/GetUsersVehicleDetailsReducer';
import getAllUsers from './usersReducers/GetAllUsersReducer';
import deleteVehicle from './vehiclereducers/DeleteVehicleReducer';
import vehicleByVehicleID from './vehiclereducers/VehicleByVehicleIDReducer';
import allServices from './servicereducers/AllServicesReducer';

const RootReducer = combineReducers({
  authLogin: authLogin,
  getAllUsers: getAllUsers,
  getUserVehicleDetails: getUserVehicleDetails,
  getAllVehicles: allVehicles,
  deleteVehicle: deleteVehicle,
  vehicleByVehicleID: vehicleByVehicleID,
  getAllServices: allServices
});

export default RootReducer;
