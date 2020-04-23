import { combineReducers} from 'redux';
import account from './account';
import accountDragons from './accountDragons';
import dragon from './dragon';
import generation from './generation';

export default combineReducers({
    account,
    accountDragons,
    dragon,
    generation
});