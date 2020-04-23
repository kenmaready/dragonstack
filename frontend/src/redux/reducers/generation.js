import moment from 'moment';
import { GENERATION } from '../types';

const DEFAULT_GENERATION_STATE = {
        generationId: '',
        expiration: '',
        loading: false,
        message: {}
};

const generationReducer = (state=DEFAULT_GENERATION_STATE, action) => {
    switch (action.type) {
        case GENERATION.FETCH:
            return { ...state, loading: true};
        case GENERATION.FETCH_ERROR:
            return {
                ...state, loading: false, message: action.payload,
            };
        case GENERATION.FETCH_SUCCESS:
            return {
                ...state,
                generationId: action.payload.generationId, expiration: moment(action.payload.expiration),
                loading: false,
                message: {}
            };
        default:
            return state;
    }
}

export default generationReducer;