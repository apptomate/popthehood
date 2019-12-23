import { combineReducers } from "redux";
import authLogin from "./authreducers/LoginReducer";
import getAllVehicles from "./vehicleReducers/AllVehiclesReducer";
import getUserVehicleDetails from "./usersReducers/GetUsersVehicleDetailsReducer";
import getAllUsers from "./usersReducers/GetAllUsersReducer";
import deleteVehicle from "./vehicleReducers/DeleteVehicleReducer";
import getAllServices from "./servicereducers/AllServicesReducer";
import getAllServicePlans from "./servicereducers/AllServicePlansReducer";
import getServicePriceByID from "./servicereducers/GetServicePriceByIDReducer";
import updateUser from "./usersReducers/PutUserReducer";
import deleteUser from "./usersReducers/DeleteUserReducer";
import updateVehicle from "./vehicleReducers/PutVehicleReducer";
import getServiceReport from "./servicereducers/ServiceReportReducer";
import vehicleServiceDetails from "./vehicleReducers/GetVehicleServiceDetailsReducer";
import dashboard from "./dashboardreducers/DashboardReducer";
import updateVehicleService from "./vehicleReducers/PutVehicleServiceDetailsReducer";
import getAllMakes from "./vehicleReducers/GetAllMakes";
import getModelByMake from "./vehicleReducers/GetModelByMake";
const RootReducer = combineReducers({
  authLogin,
  getAllUsers,
  getUserVehicleDetails,
  updateUser,
  deleteUser,
  updateVehicle,
  deleteVehicle,
  getAllVehicles,
  getAllServices,
  getAllServicePlans,
  getServicePriceByID,
  serviceReport: getServiceReport,
  vehicleServiceDetails,
  dashboard,
  updateVehicleService,
  getAllMakes,
  getModelByMake
});
export default RootReducer;
