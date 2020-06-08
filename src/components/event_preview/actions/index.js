// import axios from 'axios';

// const ROOT_URL = 'https://project-who-s-down-api.herokuapp.com/api/';

// export const ActionTypes = {
//   FETCH_EVENTS: 'FETCH_EVENTS',
//   ERROR_SET: 'ERROR_SET',
// };

// export function fetchEvents() {
//   return (dispatch) => {
//     axios.get(`${ROOT_URL}/fetchevents`)
//       .then((response) => {
//         dispatch({ type: ActionTypes.FETCH_EVENTS, payload: {events: response.data }});
//         console.log('calling fetchevents');
//       })
//       .catch((error) => {
//         console.log('Error for event_Preview');
//         dispatch({ type: ActionTypes.ERROR_SET, error});
//       });
//   };
// }
