import * as types from '../../actions/ActionTypes.jsx';
import { objectInitial } from '../../InitialState.jsx';

export default function vehicleByVehicleID(state = objectInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.VEHICLEBYVEHICLEID_SUCCESS:
    return { ...payload, loading: false, error: false };
  case types.VEHICLEBYVEHICLEID_ERROR:
    return { ...payload, loading: false, error: true };
  case types.VEHICLEBYVEHICLEID_LOADING:
    return { loading: true, error: false };
  default:
    return state;
  }
}
