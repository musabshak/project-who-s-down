/* eslint-disable no-unreachable */
/* eslint-disable object-curly-newline */
import axios from 'axios';

// const ROOT_URL = 'https://platform.cs52.me/api';
// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://project-who-s-down-api.herokuapp.com/api/';
const API_KEY = '';
// keys for actiontypes
export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

export function signupUser({ userName, fullName, email, password }) {
  return (dispatch) => {
    /* axios post */
    axios.post(`${ROOT_URL}/signup`, { userName, fullName, email, password }).then((response) => {
      console.log('Signup succeeded.');
      dispatch({ type: ActionTypes.AUTH_USER });
      console.log(response.data.token);
      // localStorage.setItem('token', response.data.token);
    })
      .catch((error) => {
        console.log('Signup failed.');
        console.log(error.response.data);
        dispatch({ type: ActionTypes.AUTH_ERROR, payload: `Signup failed: ${error.response.data}` });
      });
  };
}