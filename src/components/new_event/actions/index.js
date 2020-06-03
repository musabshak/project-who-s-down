import axios from 'axios';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://project-who-s-down-api.herokuapp.com/api/';

export const ActionTypes = {
  CREATE_EVENT: 'CREATE_EVENT',
  ERROR_SET: 'ERROR_SET',
};


const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZWQ4MDNiNjlkYTdjMDAwMzhjOTc4MmQiLCJpYXQiOjE1OTEyMTUwMzAxNzh9.j2uTsNqJOxrh64BwTfhrylX-5bRUNyqLo4eCmIkfUbg';
export function createEvent(event) {
  console.log(event);
  return (dispatch) => {
    axios.post(`${ROOT_URL}/newEvent`, event, {headers: {authorization: authToken}})
      .then((response) => {
        dispatch({ type: ActionTypes.CREATE_EVENT, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.ERROR_SET, error});
      });
  };
}