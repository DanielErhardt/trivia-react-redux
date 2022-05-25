import md5 from 'crypto-js/md5';
import { REGISTER_PLAYER } from '../actions/player';

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

  default:
    return state;
  }
};

export default player;
