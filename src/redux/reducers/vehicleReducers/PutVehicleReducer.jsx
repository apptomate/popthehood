import * as types from '../../actions/ActionTypes.jsx';
import { arrayInitial } from '../../InitialState.jsx';

export default function updateVehicle(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.UPDATEVEHICLE_SUCCESS:
            return { data: payload, loading: false, error: false };
        case types.UPDATEVEHICLE_ERROR:
            return { data: payload, error: true, loading: false };
        default:
            return state;
    }
}
