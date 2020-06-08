import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://project-who-s-down-api.herokuapp.com/api/';

export const ActionTypes = {
  CREATE_EVENT: 'CREATE_EVENT',
  ERROR_SET: 'ERROR_SET',
};

async function getToken() {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      console.log(token);
      return token;
    }
  } catch (error) {
    console.log(error);
  }
}

let authToken;
getToken().then((token) => { authToken = token; });

export function createEvent(event, callback) {
  // console.log(event);
  // console.log(authToken);
  return (dispatch) => {
    axios.post(`${ROOT_URL}/newEvent`, event, {headers: {authorization: authToken}})
      .then((response) => {
        dispatch({ type: ActionTypes.CREATE_EVENT, payload: response.data });
        callback('Main');
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.ERROR_SET, error});
      });
  };
}