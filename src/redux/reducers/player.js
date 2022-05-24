import { REGISTER_PLAYER } from '../actions/player';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REGISTER_PLAYER:
    return {
      ...state,
      gravatarEmail: action.gravatarEmail,
      name: action.name,
    };

  default:
    return state;
  }
};

export default player;
