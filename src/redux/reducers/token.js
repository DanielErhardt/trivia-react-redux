import { FETCH_TOKEN, FETCH_TOKEN_SUCCESS, FETCH_TOKEN_FAIL } from '../actions/token';

const INITIAL_STATE = {
  responseCode: 0,
  value: '',
  loading: false,
  error: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_TOKEN:
    return {
      ...state,
      loading: true,
      error: '',
    };

  case FETCH_TOKEN_SUCCESS: {
    const storedToken = localStorage.getItem('token');
    if (storedToken === null) {
      localStorage.setItem('token', action.sessionToken.token);
    }
    return {
      ...state,
      loading: false,
      responseCode: action.sessionToken.response_code,
      value: action.sessionToken.token,
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

export default token;
