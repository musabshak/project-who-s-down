import axios from 'axios';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://project-who-s-down-api.herokuapp.com/api/';

export const ActionTypes = {
  FETCH_EVENTS: 'FETCH_EVENTS',
  ERROR_SET: 'ERROR_SET',
  FETCH_POST_SUCCEEDED: 'FETCH_POST_SUCCEEDED',
  FETCH_POST_FAILED: 'FETCH_POST_FAILED',
  FETCH_SUBSCRIBED_EVENTS: 'FETCH_SUBSCRIBED_EVENTS',
  SUBSCRIBE_EVENT: 'SUBSCRIBE_EVENT',
  UNSUBSCRIBE_EVENT: 'UNSUBSCRIBE_EVENT',
  FETCH_IMDOWN_EVENTS: 'FETCH_IMDOWN_EVENTS',
  IMDOWN_EVENT: 'IMDOWN_EVENT',
  UNIMDOWN_EVENT: 'UNIMDOWN_EVENT',
};

export function fetchEvents() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/fetchevents`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_EVENTS, payload: {events: response.data }});
        console.log('calling fetchevents');
      })
      .catch((error) => {
        console.log('Error with fetchEvents');
        dispatch({ type: ActionTypes.ERROR_SET, error});
      });
  };
}

export function fetchSubscribedEvents(token) {
  console.log('Fetching subscribed events...');
  return (dispatch) => {
    // get doesn't require a boday, post does
    return axios.get(`${ROOT_URL}/fetchSubscribedEventsByUser`, { headers: { authorization: token } }).then((response) => {
      console.log('FetchSubscribedEvents succeeded.');
      // console.log(response.data);
      dispatch({ type: ActionTypes.FETCH_SUBSCRIBED_EVENTS, error: null, payload: response.data });
      return response.data;
      // localStorage.setItem('token', response.data.token);
    })
      .catch((error) => {
        console.log('FetchSubscribedEvents failed.');
        dispatch({ type: ActionTypes.FETCH_SUBSCRIBED_EVENTS, error: error.response.data, payload: []});
      });
  };
};

export function subscribeEvent(token, eventId) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/subscribeEvent/${eventId}`, null ,{ headers: { authorization: token } }).then((response) => {
      console.log('SubscribeEvent succeeded.');
      // console.log(response.data);
      dispatch({ type: ActionTypes.SUBSCRIBE_EVENT, error: null, payload: response.data });
      // localStorage.setItem('token', response.data.token);
    })
      .catch((error) => {
        console.log('SubscribeEvent failed.', error.response.data);
        dispatch({ type: ActionTypes.SUBSCRIBE_EVENT, error: error.response.data, payload: []});
      });
  }
}

export function unsubscribeEvent(token, eventId) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/unsubscribeEvent/${eventId}`, null ,{ headers: { authorization: token } }).then((response) => {
      console.log('UnsubscribeEvent succeeded.');
      // console.log(response.data);
      dispatch({ type: ActionTypes.SUBSCRIBE_EVENT, error: null, payload: response.data });
      // localStorage.setItem('token', response.data.token);
    })
      .catch((error) => {
        console.log('UnsubscribeEvent failed.', error.response.data);
        dispatch({ type: ActionTypes.SUBSCRIBE_EVENT, error: error.response.data, payload: []});
      });
  }
}

export function fetchImdownEvents(token) {
  console.log('Fetching imdown events...');
  return (dispatch) => {
    // get doesn't require a boday, post does
    return axios.get(`${ROOT_URL}/fetchImdownEventsByUser`, { headers: { authorization: token } }).then((response) => {
      console.log('FetchImdownEvents succeeded.');
      // console.log(response.data);
      dispatch({ type: ActionTypes.FETCH_IMDOWN_EVENTS, error: null, payload: response.data });
      return response.data;
    })
      .catch((error) => {
        console.log('FetchImdownEvents failed.');
        dispatch({ type: ActionTypes.FETCH_IMDOWN_EVENTS, error: error.response.data, payload: []});
      });
  };
};

export function imdownEvent(token, eventId) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/imdownEvent/${eventId}`, null ,{ headers: { authorization: token } }).then((response) => {
      console.log('ImdownEvent succeeded.');
      dispatch({ type: ActionTypes.IMDOWN_EVENT, error: null, payload: response.data });
    })
      .catch((error) => {
        console.log('ImdownEvent failed.', error.response.data);
        dispatch({ type: ActionTypes.IMDOWN_EVENT, error: error.response.data, payload: []});
      });
  }
}

export function unimdownEvent(token, eventId) {
  return (dispatch) => {
    return axios.post(`${ROOT_URL}/unimdownEvent/${eventId}`, null ,{ headers: { authorization: token } }).then((response) => {
      console.log('UnimdownEvent succeeded.');
      dispatch({ type: ActionTypes.UNIMDOWN_EVENT, error: null, payload: response.data });
    })
      .catch((error) => {
        console.log('UnimdownEvent failed.', error.response.data);
        dispatch({ type: ActionTypes.UNIMDOWN_EVENT, error: error.response.data, payload: []});
      });
  }
}

