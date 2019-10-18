import * as types from '../../actions/ActionTypes.jsx';
import { objectInitial } from '../../InitialState.jsx';

export default function getAllUsers(state = objectInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ALLUSERS_SUCCESS:
            return { data: payload, loading: false, error: false };
        case types.ALLUSERS_LOADING:
            return { loading: true, error: false };
        case types.ALLUSERS_ERROR:
            return { data: payload, error: true, loading: false };
        default:
            return state;
    }
}
