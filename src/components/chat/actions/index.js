/* eslint-disable no-unreachable */
/* eslint-disable object-curly-newline */
import axios from 'axios';

// const ROOT_URL = 'https://platform.cs52.me/api';
// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://project-who-s-down-api.herokuapp.com/api/';
const API_KEY = '';

// keys for actiontypes
export const ActionTypes = {
  FETCH_EVENTS: 'FETCH_EVENTS',
  FETCH_CHAT: 'FETCH_CHAT',
  NEW_CHAT: 'FETCH_POST_SUCCEEDED',
  NEW_CHAT_ERROR: 'NEW_CHAT_ERROR',
  SET_CHAT_TIMER: 'SET_CHAT_TIMER',
  CLEAR_CHAT: 'CLEAR_CHAT',
};

export function fetchEvents() {
  return (dispatch) => {
    /* axios post */
    axios.get(`${ROOT_URL}/fetchEvents`).then((response) => {
      // console.log(response.data);
      dispatch({ type: ActionTypes.FETCH_EVENTS, error: null, payload: response.data });
      // localStorage.setItem('token', response.data.token);
    })
      .catch((error) => {
        console.log('fetch event failed in chat.');
        console.log(error);
        dispatch({ type: ActionTypes.FETCH_EVENTS, error: error.response.data, payload: []});
      });
  };
}

export function fetchChat(eventID, token) {
  // const tokendum = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZWRiMjM2MTQ5ODAyZTAwMzg0NmEzMmIiLCJpYXQiOjE1OTE0MTk3NDU0MDJ9.eEgeqPpXWJB4teK9D-hG12xjFpUF7A59lce1IgVFUW8'; 
  return (dispatch) => {
    axios.get(`${ROOT_URL}/chat/${eventID}`, { headers: { authorization: token } }).then((response) => {
      // console.log('FetchChat succeeded.'); 5edef6985a11ba0038f315b2
      dispatch({ type: ActionTypes.FETCH_CHAT, error: null, payload: response.data });
    })
      .catch((error) => {
        console.log('Fetch chat failed.');
        dispatch({ type: ActionTypes.FETCH_CHAT, error: error.response.data, payload: []});
      });
  };
}

export function setChatTimer(timer) {
  console.log('setting chat timer: ', timer);
  return (dispatch) => {
    if (timer) {
      dispatch({ type: ActionTypes.SET_CHAT_TIMER, error: null, payload: timer, test: 'test'});
    }
     
    else console.log('chat/actions: invalid timer.');
  };
}

export function newChat(newMessage, eventID, token) {
  // console.log(authToken);
  // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZWRiMjM2MTQ5ODAyZTAwMzg0NmEzMmIiLCJpYXQiOjE1OTE0MTk3NDU0MDJ9.eEgeqPpXWJB4teK9D-hG12xjFpUF7A59lce1IgVFUW8';

  return (dispatch) => {
    axios.post(`${ROOT_URL}/chat/${eventID}`, newMessage, { headers: { authorization: token } })
      .then((response) => {
        console.log('successful post request');
      })
      .catch((error) => {
        console.log('Unsuccessfully sent chat');
        dispatch({ type: ActionTypes.NEW_CHAT_ERROR});
      });
  };
}

export function clearChat() {
  return (dispatch) => {
    dispatch({type: ActionTypes.CLEAR_CHAT,
    });
  };
}