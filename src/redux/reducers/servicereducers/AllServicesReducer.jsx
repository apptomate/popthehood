import * as types from '../../actions/ActionTypes.jsx';
import { singleObjectInitial } from '../../InitialState.jsx';

export default function getAllServices(state = singleObjectInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.ALLSERVICES_SUCCESS:
    return { allServices: payload, loading: false, error: false };
  case types.ALLSERVICES_LOADING:
    return { loading: true, error: false };
  case types.ALLSERVICES_ERROR:
    return { error: payload, loading: false };
  default:
    return state;
  }
}
