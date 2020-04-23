import { GENERATION, DRAGON, ACCOUNT, ACCOUNT_DRAGONS } from '../types';
import { BACKEND } from '../../config';


// private helper function for signup, login, logout and others
const fetchFromAccount = ({ endpoint, options, FETCH_TYPE, ERROR_TYPE, SUCCESS_TYPE }) => dispatch => {
    dispatch({ type: FETCH_TYPE });
    return fetch(`${BACKEND.baseUrl}/account/${endpoint}`, 
    {...options, credentials: 'include'})
    .then(response => response.json())
    .then(json => {
        if (json.type === 'error') {
            dispatch({
                type: ERROR_TYPE,
                error: json.message
            });
        } else {
            dispatch({
                type: SUCCESS_TYPE,
                payload: {...json}
            });
        }
    })
    .catch(error => dispatch({
        type: ERROR_TYPE,
        error: error.message
        })
    );
}

export const signup = (credentials) => {
    return fetchFromAccount({ 
        endpoint: 'signup',
        options: {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' }
        },
        FETCH_TYPE: ACCOUNT.FETCH,
        ERROR_TYPE: ACCOUNT.FETCH_ERROR,
        SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS
    });
}

export const login = (credentials) => {
    return fetchFromAccount({
        endpoint: 'login',
        options: {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' }
        },
        FETCH_TYPE: ACCOUNT.FETCH,
        ERROR_TYPE: ACCOUNT.FETCH_ERROR,
        SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS
    });
}

export const logout = () => {
    return fetchFromAccount({
        endpoint: 'logout',
        options: {},
        FETCH_TYPE: ACCOUNT.FETCH,
        ERROR_TYPE: ACCOUNT.FETCH_ERROR,
        SUCCESS_TYPE: ACCOUNT.FETCH_LOGOUT_SUCCESS
    });
}

export const checkAuthenticated = () => {
    return fetchFromAccount({
        endpoint: 'authenticated',
        options: {},
        FETCH_TYPE: ACCOUNT.FETCH,
        ERROR_TYPE: ACCOUNT.FETCH_ERROR,
        SUCCESS_TYPE: ACCOUNT.FETCH_AUTHENTICATED_SUCCESS
    })
}

export const fetchGeneration = () => dispatch => {
    console.log("Action fetchGeneration called.")
    dispatch({ type: GENERATION.FETCH });
    return fetch(`${BACKEND.baseUrl}/generation`)
    .then(response => response.json())
    .then(json => {
        if (json.type === 'error') {
            dispatch({
            type: GENERATION.FETCH_ERROR,
            payload: json.message
            })
        } else {
            console.log("New generation fetched: it is: ", json.generation)
        dispatch({ 
            type: GENERATION.FETCH_SUCCESS,
            payload: json.generation
        });
        }
    })
    .catch(error => dispatch({
        type: GENERATION.FETCH_ERROR,
        payload: error.message
    }));
}

export const fetchDragon = () => dispatch => {
    dispatch({ type: DRAGON.FETCH });
    fetch(`${BACKEND.baseUrl}/dragon/new`, 
        { credentials: 'include' })
    .then(response => response.json())
    .then(json => {
        if (json.type === 'error') {
            dispatch({
                type: DRAGON.FETCH_ERROR, 
                payload: json.message
            });
        } else {
            dispatch({
                type: DRAGON.FETCH_SUCCESS,
                payload: json.dragon
            });
        }
    })
    .catch(error => dispatch({
        type: DRAGON.FETCH_ERROR,
        payload: error.message
    }));
}

export const fetchAccountDragons = () => {
    return fetchFromAccount({
        endpoint: 'dragons',
        options: {},
        FETCH_TYPE: ACCOUNT_DRAGONS.FETCH,
        ERROR_TYPE: ACCOUNT_DRAGONS.FETCH_ERROR,
        SUCCESS_TYPE: ACCOUNT_DRAGONS.FETCH_SUCCESS
    })
}



