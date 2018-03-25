import reducer from './reducers';
import { combineReducers } from 'redux';

export default combineReducers({
    root: reducer,
});

