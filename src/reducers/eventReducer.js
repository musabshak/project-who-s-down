// import { ActionTypes } from '../components/geographic_view/actions';
// // NOW DEFUNCT

// const initialState = {
//   filteredOut: {
//     categories: [],
//     skillLevels: [],
//     timesAfter: null, // going to need a better way to handle times
//     timesBefore: null,
//   },
// };


// const eventReducer = (state = initialState, action, debug = true) => {
//   switch (action.type) {
//   case ActionTypes.changeFilters: // return that single post.
//     if (debug) {
//       console.log('Ok, so we\'re in the reducer for the case changeFilters and this is our current state:', state);
//       console.log('Action.payload =', action.payload);
//     }
//     return { ...state, filteredOut: action.payload };
  
//   default:
//     return state;
//   }
// };
  
// export default eventReducer;