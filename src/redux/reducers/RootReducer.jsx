import { combineReducers } from 'redux';
import authLogin from './authreducers/LoginReducer';
import allVehicles from './vehiclereducers/AllVehiclesReducer';

const RootReducer = combineReducers({
  authLogin: authLogin,
  getAllVehicles: allVehicles
});

export default RootReducer;
