import * as types from '../../actions/ActionTypes.jsx';
import { arrayInitial } from '../../InitialState.jsx';
export default function vehicleServiceDetails(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.VEHICLESERVICEDETAILS_SUCCESS:
    return {
      data: payload,
      loading: false,
      error: false
    };
  case types.VEHICLESERVICEDETAILS_ERROR:
    return { data: payload, error: true, loading: false };
  default:
    return { state };
  }
}
