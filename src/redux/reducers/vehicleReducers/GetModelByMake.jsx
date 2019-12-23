import * as types from "../../actions/ActionTypes.jsx";
import { singleObjectInitial } from "../../InitialState.jsx";

export default function getModelByMake(state = singleObjectInitial, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GETMODELBYMAKE_SUCCESS:
      return { data: payload, loading: false, error: false };
    case types.GETMODELBYMAKE_ERROR:
      return { error: payload, loading: false };
    default:
      return state;
  }
}
