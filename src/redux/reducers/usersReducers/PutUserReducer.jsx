import * as types from '../../actions/ActionTypes.jsx';
import { arrayInitial } from '../../InitialState.jsx';

export default function updateUser(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.UPDATEUSER_SUCCESS:
            return { data: payload, loading: false, error: false };
        case types.UPDATEUSER_ERROR:
            return { data: payload, error: true, loading: false };
        default:
            return state;
    }
}
