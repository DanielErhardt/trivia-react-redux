export const REGISTER_PLAYER = 'REGISTER_PLAYER';

export const registerPlayerAction = (name, gravatarEmail) => ({
  type: REGISTER_PLAYER,
  name,
  gravatarEmail,
});
