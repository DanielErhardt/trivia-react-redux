import { combineReducers } from 'redux';
import player from './player';
import token from './token';

// const reducer = combineReducers({ user, wallet });
const reducer = combineReducers({ player, token });

export default reducer;
