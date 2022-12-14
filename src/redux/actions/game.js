export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAIL = 'FETCH_QUESTIONS_FAIL';
export const RESET_TIMER = 'SET_TIMER';
export const DECREASE_TIMER = 'DECREASE_TIMER';

const QUESTION_AMOUNT = 5;
const generateURL = (amount, token) => `https://opentdb.com/api.php?amount=${amount}&token=${token}`;

export const resetTimerAction = () => ({
  type: RESET_TIMER,
});

export const decreaseTimerAction = () => ({
  type: DECREASE_TIMER,
});

export const fetchQuestionsAction = () => ({
  type: FETCH_QUESTIONS,
});

export const fetchQuestionsSuccessAction = (questions) => ({
  type: FETCH_QUESTIONS_SUCCESS,
  questions,
});

export const fetchQuestionsFailAction = (error) => ({
  type: FETCH_QUESTIONS_FAIL,
  error,
});

export const fetchQuestionsThunk = () => async (dispatch) => {
  dispatch(fetchQuestionsAction());
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(generateURL(QUESTION_AMOUNT, token));
    const questions = await response.json();
    dispatch(fetchQuestionsSuccessAction(questions));
  } catch (error) {
    dispatch(fetchQuestionsFailAction(error));
  }
};
