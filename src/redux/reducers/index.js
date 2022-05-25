import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import game from './game';

// const reducer = combineReducers({ user, wallet });
const reducer = combineReducers({ player, token, game });

export default reducer;
