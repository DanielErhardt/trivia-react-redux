export const REGISTER_PLAYER = 'REGISTER_PLAYER';
export const ADD_SCORE = 'ADD_TOTAL_SCORE';

export const addScoreAction = (score) => ({
  type: ADD_SCORE,
  score,
});

export const registerPlayerAction = (name, gravatarEmail) => ({
  type: REGISTER_PLAYER,
  name,
  gravatarEmail,
});
