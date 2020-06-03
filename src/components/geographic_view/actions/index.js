import axios from 'axios';

const ROOT_URL = 'https://project-who-s-down-api.herokuapp.com/api/';


// keys for actiontypes
export const ActionTypes = {
  changeFilters: 'changeFilters',
  fetchEvents: 'fetchEvents',
};


// so these actions + the current state are all the reducer should need to get the next state

// changeFilters
export function changeFilters(newFilters) {
  console.log('We are in the action creator for changeFilters, producing a changeFilters action!');
  return (dispatch) => {
    dispatch({ type: ActionTypes.changeFilters, payload: newFilters }); 
  };
}


export function fetchEvents(debug = false) {
  console.log('We are in the action creator for fetchEvents, producing a fetchEvents action!');
  return (dispatch) => {
    axios.get(`${ROOT_URL}/fetchEvents`)
      .then((response) => {
        if (debug) { console.log('hi aarish :o', response); }
        dispatch({ type: ActionTypes.fetchEvents, payload: response });
      })
      .catch((error) => {
        console.log('error!', error);
      });
  };
}