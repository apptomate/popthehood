import * as types from '../../actions/ActionTypes.jsx';
import { singleObjectInitial } from '../../InitialState.jsx';

export default function getServicePriceByID(
  state = singleObjectInitial,
  action
) {
  const { type, payload } = action;
  switch (type) {
  case types.GETSERVICEPRICEBYID_SUCCESS:
    return { allServices: payload, loading: false, error: false };
  case types.GETSERVICEPRICEBYID_LOADING:
    return { loading: true, error: false };
  case types.GETSERVICEPRICEBYID_ERROR:
    return { error: payload, loading: false };
  default:
    return state;
  }
}
