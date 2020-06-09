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

const saveValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(`save${key} failed!`);
  }
};

export function signupUser({ userName, fullName, email, password }, navigate) {
  return (dispatch) => {
    /* axios post */
    axios.post(`${ROOT_URL}/signup`, { userName, fullName, email, password }).then((response) => {
      console.log('Signup succeeded.');
      saveValue('token', response.data.token);
      saveValue('userName', response.data.userName);
      dispatch({ type: ActionTypes.AUTH_USER, userName: response.data.userName, token: response.data.token });
      navigate('Main', {});
      // console.log('signed up new user');
      // console.log(response.data.token);
      // localStorage.setItem('token', response.data.token);
    })
      .catch((error) => {
        console.log('Signup failed.');
        console.log(error.response.data.error);
        dispatch({ type: ActionTypes.AUTH_ERROR, signupMsg: error.response.data.error });
      });
  };
}