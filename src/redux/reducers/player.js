import md5 from 'crypto-js/md5';
import { REGISTER_PLAYER, ADD_SCORE } from '../actions/player';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
  gravatarURL: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REGISTER_PLAYER:
    return {
      ...state,
      gravatarEmail: action.gravatarEmail,
      gravatarURL: `https://www.gravatar.com/avatar/${md5(action.gravatarEmail).toString()}`,
      name: action.name,
    };
  case ADD_SCORE:
    return { ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
};

export default player;
