import moment from 'moment';
import { DRAGON } from '../types';

const DEFAULT_DRAGON = {
    birthdate: moment(),
    nickname: 'Valerion the Dark Flame',
    generationId: 1783,
    dragonId: 3,
    traits: [{traitType: 'backgroundColor', traitValue: 'black'}, {traitType: 'size', traitValue: 'giant'}, {traitType: 'build', traitValue:'athletic'}, {traitType: 'pattern', traitValue: 'flames'}],
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