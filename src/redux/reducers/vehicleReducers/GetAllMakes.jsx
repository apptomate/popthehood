import * as types from "../../actions/ActionTypes.jsx";
import { singleObjectInitial } from "../../InitialState.jsx";

export default function getAllMakes(state = singleObjectInitial, action) {
  const { type, payload } = action;
  switch (type) {
    case types.ALLVEHICLEMAKES_SUCCESS:
      return { data: payload, loading: false, error: false };
    case types.ALLVEHICLEMAKES_ERROR:
      return { error: payload, loading: false };
    default:
      return state;
  }
}
