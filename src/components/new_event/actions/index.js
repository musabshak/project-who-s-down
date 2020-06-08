import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://project-who-s-down-api.herokuapp.com/api/';

export const ActionTypes = {
  NEW_EVENT_SUCCESS: 'NEW_EVENT_SUCCESS',
  NEW_EVENT_ERROR: 'NEW_EVENT_ERROR',
  RESET_BACKEND_STATUS: 'RESET_BACKEND_STATUS',
};

async function getToken() {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      // console.log(token);
      return token;
    }
  } catch (error) {
    console.log(error);
  }
}

// let authToken;
// getToken().then((token) => { authToken = token; });
// console.log(authToken);

export function createEvent(event) {
  console.log(event);
  // console.log(authToken);
  return (dispatch) => {
    getToken().then((token) => {
      axios.post(`${ROOT_URL}/newEvent`, event, {headers: {authorization: token}})
        .then((response) => {
          console.log('successful post request');
          console.log(response.data);
          dispatch({ type: ActionTypes.NEW_EVENT_SUCCESS, payload: response.data.eventTitle });
        })
        .catch((error) => {
          console.log(error);
          console.log('UNsuccessful post request');
          dispatch({ type: ActionTypes.NEW_EVENT_ERROR});
        }); });
  };
}

export function resetBackEndErrorState() {
  return {type: ActionTypes.RESET_BACKEND_STATUS };
}