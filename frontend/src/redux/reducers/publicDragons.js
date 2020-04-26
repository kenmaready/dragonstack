import { PUBLIC_DRAGONS } from '../types';

const DEFAULT_STATE = {
    dragons: [],
    loading: false,
    error: ''
};

const publicDragons = (state=DEFAULT_STATE, action) => {
    switch(action.type) {
        case PUBLIC_DRAGONS.FETCH:
        case PUBLIC_DRAGONS.BUY:
            return {...state, loading: true, error: ''};
        case PUBLIC_DRAGONS.FETCH_ERROR:
        case PUBLIC_DRAGONS.BUY_ERROR:
            return {...state, loading: false, error: action.error};
        case PUBLIC_DRAGONS.FETCH_SUCCESS:
            return {...state, dragons: action.payload, loading: false, error: ''}
        case PUBLIC_DRAGONS.BUY_SUCCESS:
            let dragonIndex = state.dragons.findIndex(dragon => dragon.dragonId === action.payload.dragonId);
            let newDragons = Array.from(state.dragons);
            newDragons.splice(dragonIndex, 1);
            return {...state, dragons: newDragons, loading: false, error: ''};
        default:
            return state;
    }
}

export default publicDragons;