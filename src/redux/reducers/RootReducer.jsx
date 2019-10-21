import { combineReducers } from 'redux';
import authLogin from './authreducers/LoginReducer';
import getUserVehicleDetails from './usersReducers/GetUsersVehicleDetailsReducer';
import getAllUsers from './usersReducers/GetAllUsersReducer';
import updateUser from './usersReducers/PutUserReducer';
import deleteUser from './usersReducers/DeleteUserReducer';
import updateVehicle from './vehicleReducers/PutVehicleReducer';

const RootReducer = combineReducers({
    authLogin: authLogin,
    getAllUsers: getAllUsers,
    getUserVehicleDetails: getUserVehicleDetails,
    updateUser: updateUser,
    deleteUser: deleteUser,
    updateVehicle: updateVehicle
});

export default RootReducer;
