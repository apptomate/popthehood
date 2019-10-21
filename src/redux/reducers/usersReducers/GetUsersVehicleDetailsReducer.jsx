import * as types from '../../actions/ActionTypes.jsx';
import { arrayInitial } from '../../InitialState.jsx';

export default function getUserVehicleDetails(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.USERVEHICLE_SUCCESS:
            return {
                data: payload,
                loading: false,
                error: false
            };
        case types.USERVEHICLE_LOADING:
            return { loading: true, error: false };
        case types.USERVEHICLE_ERROR:
            return { data: payload, error: true, loading: false };
        default:
            return { state };
    }
}
