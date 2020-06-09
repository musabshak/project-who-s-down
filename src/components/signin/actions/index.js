/* eslint-disable no-unreachable */
/* eslint-disable object-curly-newline */
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// const ROOT_URL = 'https://platform.cs52.me/api';
// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://project-who-s-down-api.herokuapp.com/api/';
const API_KEY = '';

const saveValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(`save${key} failed!`);
  }
};
const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(`remove${key} failed!`);
  }
};

export function loadToken(navigation) {
  console.log('loadToken Called');
  return (dispatch) => {
    return AsyncStorage.getItem('token').then((token) => {
      if (token) {
        console.log('Got token!');
        AsyncStorage.getItem('userName').then((userName) => {
          dispatch({ type: ActionTypes.AUTH_USER, userName, token });
        });
      } else console.log('loadToken failed!');
    });
  };
}

// keys for actiontypes
export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

export function signinUser({ email, password }, navigation, ret) {
  console.log('Signing in!');
  return (dispatch) => {
    /* axios post */
    return axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      console.log('Signin succeeded.');
      saveValue('token', response.data.token);
      saveValue('userName', response.data.userName);
      dispatch({ type: ActionTypes.AUTH_USER, userName: response.data.userName, token: response.data.token });
      console.log('ret', ret);
      if (!ret) navigation.navigate('Main', {}); 
      else navigation.pop();
      return 0;
      // localStorage.setItem('token', response.data.token);
    })
      .catch((error) => {
        console.log('Signin failed.');
        console.log(error.response.data.error);
        dispatch({ type: ActionTypes.AUTH_ERROR, signinMsg: 'Signin failed.' });
        return 1;
      });
  };
}

export function signoutUser(navigate) {
  console.log('Signing out!');
  return (dispatch) => {
    dispatch({ type: ActionTypes.DEAUTH_USER });
    removeValue('token');
    removeValue('userName');
    if (navigate) navigate('SignIn', {});
  };
}
