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
    loading: false,
    message: {}
};

const dragonReducer = (state=DEFAULT_DRAGON, action) => {
    switch (action.type) {
        case DRAGON.FETCH:
            return { ...state, loading: true};
        case DRAGON.FETCH_ERROR:
            return {
                ...state, loading: false, message: action.payload,
            };
        case DRAGON.FETCH_SUCCESS:
            return {
                ...action.payload,
                birthdate: moment(action.payload.birthdate),
                loading: false,
                message: {}
            };
        default:
            return state;
    }
}

export default dragonReducer;