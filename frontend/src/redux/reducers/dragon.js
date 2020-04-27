import moment from 'moment';
import { DRAGON } from '../types';

const DEFAULT_DRAGON = {
    birthdate: null,
    nickname: '',
    generationId: null,
    dragonId: null,
    traits: [],
    isPublic: false,
    saleValue: null,
    sireValue: null,
    loading: false,
    message: {},
    error: ''
};

const dragonReducer = (state=DEFAULT_DRAGON, action) => {
    switch (action.type) {
        case DRAGON.FETCH:
            return { ...state, loading: true, error: ''};
        case DRAGON.FETCH_ERROR:
            return {
                ...state, loading: false, error: action.payload,
            };
        case DRAGON.FETCH_SUCCESS:
            return {
                ...action.payload,
                birthdate: moment(action.payload.birthdate),
                loading: false,
                message: {},
                error: ''
            };
        default:
            return state;
    }
}

export default dragonReducer;