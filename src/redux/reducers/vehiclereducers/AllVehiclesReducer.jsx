import * as types from '../../actions/ActionTypes.jsx';
import { objectInitial } from '../../InitialState.jsx';

export default function allVehicles(state = objectInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.ALLVEHICLES_SUCCESS:
    return { allVehicles: payload, loading: false, error: false };
  case types.ALLVEHICLES_LOADING:
    return { loading: true, error: false };
  case types.ALLVEHICLES_ERROR:
    return { error: payload, loading: false };
  default:
    return state;
  }
}
