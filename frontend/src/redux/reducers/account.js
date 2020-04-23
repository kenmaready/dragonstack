import { ACCOUNT } from '../types';

const DEFAULT_ACCOUNT = {
    loggedIn: false,
    message: '',
    error: '',
    loading: false
}

const account = (state=DEFAULT_ACCOUNT, action) => {
    switch(action.type) {
        case ACCOUNT.FETCH:
            return { ...state, loading: true, message: '', error: '' };
        case ACCOUNT.FETCH_ERROR:
            return { ...state, loading: false, error: action.error };
        case ACCOUNT.FETCH_SUCCESS:
            return { ...state, loggedIn: true, message: action.payload, error: '', loading: false };
        case ACCOUNT.FETCH_LOGOUT_SUCCESS:
            return { ...state, loggedIn: false, message: action.payload, error: '', loading: false };
        case ACCOUNT.FETCH_AUTHENTICATED_SUCCESS:
            console.log("fetch authenticated success returned...");
            console.log("action returned: ", action);
            return { ...state, 
                loggedIn: action.payload.authenticated, 
                message: action.payload, 
                error: '', 
                loading: false
            };
        default:
            return state;
    }
}

export default account;