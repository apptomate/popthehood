import * as types from '../../actions/ActionTypes.jsx';
import { singleObjectInitial } from '../../InitialState.jsx';

export default function getServicePriceByID(
  state = singleObjectInitial,
  action
) {
  const { type, payload } = action;
  switch (type) {
  case types.ALLSERVICEPLANS_SUCCESS:
    console.error(payload);
    return { allServices: payload, loading: false, error: false };
  case types.ALLSERVICEPLANS_LOADING:
    return { loading: true, error: false };
  case types.ALLSERVICEPLANS_ERROR:
    return { error: payload, loading: false };
  default:
    return state;
  }
}
