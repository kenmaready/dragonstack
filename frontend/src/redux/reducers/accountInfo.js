import { ACCOUNT_INFO } from '../types';

const DEFAULT_STATE = {
    loading: false,
    message: '',
    error: ''
};

const accountInfo = (state=DEFAULT_STATE, action) => {
    switch (action.type) {
        case ACCOUNT_INFO.FETCH:
            return { ...state, loading: true, error: '' };
        case ACCOUNT_INFO.FETCH_ERROR:
            return { ...state, loading: false, error: action.error }
        case ACCOUNT_INFO.FETCH_SUCCESS:
            return { ...state, ...action.payload.info, loading: false, error: '' }
        default:
            return state;
    }
}

export default accountInfo;