import axios from 'axios';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://cs52-whos-down.herokuapp.com/api';

export const ActionTypes = {
  CREATE_EVENT: 'CREATE_EVENT',
  ERROR_SET: 'ERROR_SET',
};

export function createEvent(event) {
  console.log(event);
  return (dispatch) => {
    axios.post(`${ROOT_URL}/newEvent`, event)
      .then((response) => {
        dispatch({ type: ActionTypes.CREATE_EVENT, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.ERROR_SET, error});
      });
  };
}