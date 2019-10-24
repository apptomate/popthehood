import * as types from '../../actions/ActionTypes.jsx';
import { singleObjectInitial } from '../../InitialState.jsx';

export default function dashboard(state = singleObjectInitial, action) {
  const { type, payload } = action;
  switch (type) {
  case types.DASHBOARD_SUCCESS:
    return { dashboard: payload, loading: false, error: false };
  case types.DASHBOARD_LOADING:
    return { loading: true, error: false };
  case types.DASHBOARD_ERROR:
    return { error: payload, loading: false };
  default:
    return state;
  }
}
