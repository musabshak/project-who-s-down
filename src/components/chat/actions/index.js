// /* eslint-disable no-unreachable */
// /* eslint-disable object-curly-newline */
// import axios from 'axios';

// // const ROOT_URL = 'https://platform.cs52.me/api';
// // const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://project-who-s-down-api.herokuapp.com/api/';
// const API_KEY = '';
// // keys for actiontypes
// export const ActionTypes = {
//   FETCH_EVENTs: 'FETCH_EVENTS',
//   FETCH_POST_SUCCEEDED: 'FETCH_POST_SUCCEEDED',
//   FETCH_POST_FAILED: 'FETCH_POST_FAILED',
// };

// export function fetchEvents() {
//   console.log('Fetching events...');
//   return (dispatch) => {
//     /* axios post */
//     axios.get(`${ROOT_URL}/fetchEvents`).then((response) => {
//       console.log('FetchEvents succeeded.');
//       // console.log(response.data);
//       dispatch({ type: ActionTypes.FETCH_EVENTS, error: null, payload: response.data });
//       // localStorage.setItem('token', response.data.token);
//     })
//       .catch((error) => {
//         console.log('FetchEvents failed.');
//         dispatch({ type: ActionTypes.FETCH_EVENTS, error: error.response.data, payload: []});
//       });
//   };
// }