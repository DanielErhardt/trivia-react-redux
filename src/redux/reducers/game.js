import {
  FETCH_QUESTIONS, FETCH_QUESTIONS_SUCCESS, FETCH_QUESTIONS_FAIL,
  RESET_TIMER, DECREASE_TIMER,
} from '../actions/game';

const INITIAL_TIMER = 30;

const INITIAL_STATE = {
  responseCode: 0,
  questionsInfo: [],
  timer: INITIAL_TIMER,
  loading: false,
  error: '',
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_QUESTIONS:
    return { ...state,
      loading: true,
      error: '',
    };
  case FETCH_QUESTIONS_SUCCESS: {
    const INVALID_TOKEN_CODE = 3;
    if (action.questions.response_code === INVALID_TOKEN_CODE) {
      localStorage.removeItem('token');
    }
    return { ...state,
      loading: false,
      error: '',
      responseCode: action.questions.response_code,
      questionsInfo: action.questions.results,
    };
  }
  case FETCH_QUESTIONS_FAIL:
    return { ...state,
      loading: false,
      error: action.error,
    };
  case RESET_TIMER:
    return { ...state,
      timer: INITIAL_TIMER,
    };
  case DECREASE_TIMER:
    return { ...state,
      timer: state.timer - 1,
    };
  default:
    return state;
  }
};

export default game;
