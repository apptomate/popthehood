import * as types from '../../actions/ActionTypes.jsx';
import { singleObjectInitial } from '../../InitialState.jsx';

export default function getServiceReport(state = singleObjectInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.GETSERVICEREPORT_SUCCESS:
    return { services: payload, loading: false, error: false };
  case types.GETSERVICEREPORT_LOADING:
    return { loading: true, error: false };
  case types.GETSERVICEREPORT_ERROR:
    return { error: payload, loading: false };
  default:
    return state;
  }
}