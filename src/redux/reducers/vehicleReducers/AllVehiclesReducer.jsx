import * as types from '../../actions/ActionTypes.jsx';
import { singleObjectInitial } from '../../InitialState.jsx';

export default function getAllVehicles(state = singleObjectInitial, action) {
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
