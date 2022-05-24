// Esse reducer será responsável por tratar as informações da pessoa usuária
import { REGISTER_PLAYER } from '../actions';

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
