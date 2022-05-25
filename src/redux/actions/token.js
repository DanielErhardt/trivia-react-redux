export const FETCH_TOKEN = 'FETCH_TOKEN';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_FAIL = 'FETCH_TOKEN_FAIL';

const TOKEN_API = 'https://opentdb.com/api_token.php?command=request';

export const fetchTokenAction = () => ({
  type: FETCH_TOKEN,
});

export const fetchTokenSuccessAction = (sessionToken) => ({
  type: FETCH_TOKEN_SUCCESS,
  sessionToken,
});

export const fetchTokenFailAction = (error) => ({
  type: FETCH_TOKEN_FAIL,
  error,
});

export const fetchTokenThunk = () => async (dispatch) => {
  dispatch(fetchTokenAction());
  try {
    const response = await fetch(TOKEN_API);
    const sessionToken = await response.json();
    dispatch(fetchTokenSuccessAction(sessionToken));
  } catch (error) {
    dispatch(fetchTokenFailAction(error));
  }
};
