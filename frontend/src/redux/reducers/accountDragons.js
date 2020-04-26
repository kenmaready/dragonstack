import { ACCOUNT_DRAGONS } from '../types';

const DEFAULT_ACCOUNT_DRAGONS = {
    dragons: [],
    loading: false,
    error: ''
}

const accountDragonReducer = (state=DEFAULT_ACCOUNT_DRAGONS, action) => {
    switch (action.type) {
        case ACCOUNT_DRAGONS.FETCH:
        case ACCOUNT_DRAGONS.UPDATE:
            return { ...state, loading: true, error: '' };
        case ACCOUNT_DRAGONS.FETCH_ERROR:
        case ACCOUNT_DRAGONS.UPDATE_ERROR:
            return { ...state, loading: false, error: action.error };
        case ACCOUNT_DRAGONS.FETCH_SUCCESS:
            return { ...state, loading: false, error: '', dragons: action.payload.dragons };
        case ACCOUNT_DRAGONS.UPDATE_SUCCESS:
            return { ...state, loading: false, error: '' };
        default:
            return state;
    }
}

export default accountDragonReducer;