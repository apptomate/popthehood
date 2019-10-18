import { combineReducers } from 'redux';
import authLogin from './authreducers/LoginReducer';
import getUserVehicleDetails from './usersReducers/GetUsersVehicleDetailsReducer';
import getAllUsers from './usersReducers/GetAllUsersReducer';

const RootReducer = combineReducers({
    authLogin: authLogin,
    getAllUsers: getAllUsers,
    getUserVehicleDetails: getUserVehicleDetails
});

export default RootReducer;
