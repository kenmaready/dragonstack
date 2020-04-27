import { GENERATION,
    DRAGON,
    ACCOUNT,
    ACCOUNT_DRAGONS,
    ACCOUNT_INFO,
    PUBLIC_DRAGONS } from '../types';
import { BACKEND } from '../../config';
import history from '../../history';


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

export const fetchAccountInfo = () => {
    return fetchFromAccount({
        endpoint: 'info',
        options: {},
        FETCH_TYPE: ACCOUNT_INFO.FETCH,
        ERROR_TYPE: ACCOUNT_INFO.FETCH_ERROR,
        SUCCESS_TYPE: ACCOUNT_INFO.FETCH_SUCCESS
    })
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

export const updateDragon = (credentials) => dispatch => {
    dispatch({ type: ACCOUNT_DRAGONS.UPDATE });
    fetch(`${BACKEND.baseUrl}/dragon/update`,
        { 
        method: 'PUT',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })
    .then(response => response.json())
    .then(json => {
        if (json.type === 'error') {
            dispatch({
                type: ACCOUNT_DRAGONS.UPDATE_ERROR,
                error: json.message
            });
        } else {
            dispatch({
                type: ACCOUNT_DRAGONS.UPDATE_SUCCESS,
                payload: { dragonId, nickname }
            });
        }
    })
    .catch(error => dispatch({
        type: ACCOUNT_DRAGONS.UPDATE_ERROR,
        error: error.message
        })
    );
}

export const fetchPublicDragons = () => dispatch => {
    dispatch({ type: PUBLIC_DRAGONS.FETCH });

    return fetch(`${BACKEND.baseUrl}/dragon/public-dragons`, 
        { credentials: 'include' }
        )
    .then(response => response.json())
    .then(json => {
        if (json.type === 'error') {
            dispatch({
                type: PUBLIC_DRAGONS.FETCH_ERROR,
                error: json.message
            });
        } else {
            dispatch({
                type: PUBLIC_DRAGONS.FETCH_SUCCESS,
                payload: json.dragons
            });
        }
    })
    .catch(error => dispatch({
        type: PUBLIC_DRAGONS.FETCH_ERROR,
        error: error.message
    })
    );
}

export const buyDragon = (credentials) => dispatch => {
    dispatch({ type: PUBLIC_DRAGONS.BUY });
    return fetch(`${BACKEND.baseUrl}/dragon/buy`,
        {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'   
        })
        .then(response => response.json())
        .then(json => {
            if (json.type === 'error') {
                dispatch({
                    type: PUBLIC_DRAGONS.BUY_ERROR,
                    error: json.message
                });
            } else {
                dispatch({ 
                    type: PUBLIC_DRAGONS.BUY_SUCCESS,
                    payload:  { dragonId: credentials.dragonId }
                });
            }
        })
        .catch(error => dispatch({
            type: PUBLIC_DRAGONS.BUY_ERROR,
            error: error.message
        })
    );
} 

export const mateDragons = (credentials) => dispatch => {
    dispatch({ type: ACCOUNT_DRAGONS.MATE });
    return fetch(`${BACKEND.baseUrl}/dragon/mate`,
        {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(json => {
            if (json.type === 'error') {
                dispatch({
                    type: ACCOUNT_DRAGONS.MATE_ERROR,
                    error: json.message
                });
            } else {
                dispatch({
                    type: ACCOUNT_DRAGONS.MATE_SUCCESS,
                    payload: json.message
                });
                history.push('/account-dragons');
            }
        })
        .catch(error => dispatch({
            type: ACCOUNT_DRAGONS.MATE_ERROR,
            error: error.message
        })
    );
}



