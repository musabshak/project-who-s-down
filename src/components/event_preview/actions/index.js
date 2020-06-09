/* eslint-disable no-unreachable */
/* eslint-disable object-curly-newline */
import axios from 'axios';

// const ROOT_URL = 'https://platform.cs52.me/api';
// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://project-who-s-down-api.herokuapp.com/api';
const API_KEY = '';
// keys for actiontypes
export const ActionTypes = {
  
  FETCH_IMDOWN_EVENTS: 'FETCH_IMDOWN_EVENTS',
  IMDOWN_EVENT: 'IMDOWN_EVENT',
  UNIMDOWN_EVENT: 'UNIMDOWN_EVENT',
  INCREMENT: 'INCREMENT',
};


export function fetchImdownEvents(token) {
  console.log('Fetching imdown events...');
  return (dispatch) => {
    // get doesn't require a boday, post does
    return axios.get(`${ROOT_URL}/fetchImdownEventsByUser`, { headers: { authorization: token } }).then((response) => {
      console.log('FetchImdownEvents succeeded.');
      // console.log(response.data);
      dispatch({ type: ActionTypes.FETCH_IMDOWN_EVENTS, error: null, payload: response.data });
      return response.data;
      // localStorage.setItem('token', response.data.token);
    })
      .catch((error) => {
        console.log('FetchImdownEvents failed.');
        dispatch({ type: ActionTypes.FETCH_IMDOWN_EVENTS, error: error.response.data, payload: []});
      });
  };
}

export function imdownEvent(token, eventId) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/imdownEvent/${eventId}`, null, { headers: { authorization: token } }).then((response) => {
      console.log('ImdownEvent succeeded.');
      // console.log(response.data);
      dispatch({ type: ActionTypes.IMDOWN_EVENT, error: null, payload: response.data });
      // localStorage.setItem('token', response.data.token);
    })
      .catch((error) => {
        console.log('ImdownEvent failed.', error.response.data);
        dispatch({ type: ActionTypes.IMDOWN_EVENT, error: error.response.data, payload: []});
      });
  };
}

export function unimdownEvent(token, eventId) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/unimdownEvent/${eventId}`, null, { headers: { authorization: token } }).then((response) => {
      console.log('UnimdownEvent succeeded.');
      // console.log(response.data);
      dispatch({ type: ActionTypes.UNIMDOWN_EVENT, error: null, payload: response.data });
      // localStorage.setItem('token', response.data.token);
    })
      .catch((error) => {
        console.log('UnimdownEvent failed.', error.response.data);
        dispatch({ type: ActionTypes.UNIMDOWN_EVENT, error: error.response.data, payload: []});
      });
  };
}

export function increment() {
  console.log('in increment!');
  return {
    type: ActionTypes.INCREMENT,
    payload: null,
  };
}
