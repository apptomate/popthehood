import * as types from '../../actions/ActionTypes.jsx';
import { singleObjectInitial } from '../../InitialState.jsx';

export default function deleteVehicle(state = singleObjectInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.DELETEVEHICLE_SUCCESS:
    return { data: payload, loading: false, error: false, isLogin: true };
  case types.DELETEVEHICLE_LOADING:
    return { loading: true, error: false };
  case types.DELETEVEHICLE_ERROR:
    return { error: true, loading: false };
  default:
    return state;
  }
}
