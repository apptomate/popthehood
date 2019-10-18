import * as types from '../../actions/ActionTypes.jsx';
import { objectInitial } from '../../InitialState.jsx';

export default function getUserVehicleDetails(state = objectInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.USERVEHICLE_SUCCESS:
            return { data: payload, loading: false, error: false };
        case types.USERVEHICLE_LOADING:
            return { loading: true, error: false };
        case types.USERVEHICLE_ERROR:
            return { data: payload, error: true, loading: false };
        default:
            return state;
    }
}
