import { combineReducers} from 'redux';
import account from './account';
import accountInfo from './accountInfo';
import accountDragons from './accountDragons';
import dragon from './dragon';
import generation from './generation';
import publicDragons from './publicDragons';

export default combineReducers({
    account,
    accountDragons,
    accountInfo,
    dragon,
    generation,
    publicDragons
});