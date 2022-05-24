import { FETCH_TOKEN, FETCH_TOKEN_SUCCESS, FETCH_TOKEN_FAIL } from '../actions/token';

const INITIAL_STATE = {
  sessionToken: {},
  loading: false,
  error: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_TOKEN:
    return {
      ...state,
      loading: true,
      error: '',
    };

  case FETCH_TOKEN_SUCCESS: {
    // salva token no localStorage
    localStorage.setItem('token', action.sessionToken.token);
    return {
      ...state,
      loading: false,
      sessionToken: action.sessionToken,
      error: '',
    };
  }

  case FETCH_TOKEN_FAIL:
    return {
      ...state,
      loading: false,
      error: action.error,
    };

  default:
    return state;
  }
};

export default player;
