/* eslint-disable no-case-declarations */
// ^so this linter rule is intended to prevent bugs related to "falling through" where multiple cases get triggered in 
// a case/switch construct but since I'm using return in my cases I just disabled it

import { ActionTypes } from '../../geographic_view/actions';


const initialState = {
  filteredOut: {
    categories: [],
    skillLevels: [],
    timesAfter: null, // going to need a better way to handle times
    timesBefore: null,
  },

};
  
  
const geoViewReducer = (state = initialState, action, debug = false) => {
  console.log('hi!');
  if (action.payload) {
    // console.log('action.payload:', action.payload);
    // const newFilterInstance = action.payload.SpecificFilter; 
    // const oldFilters = state.filteredOut;

  }
  switch (action.type) {
  case ActionTypes.changeFilters: 
    if (debug) {
      console.log('incoming state:', state);
      console.log('action.payload', action.payload);
    }

    if (action.payload.FilterType === 'categories' || action.payload.FilterType === 'skillLevels') {
      const newFilterInstance = action.payload.SpecificFilter; 
      const newFiltersToAdd = state.filteredOut[action.payload.FilterType].concat(newFilterInstance); // need to check if already in the list
      const newState = state.filteredOut;
      newState[action.payload.FilterType] = newFiltersToAdd;
      console.log('reducer returning this:', newState);

      return {...state, filteredOut: newState};
    }

    else {
      return state;
    }

  case ActionTypes.fetchEvents:
    if (debug) {
      console.log('\n\n\n\n\nin the reducer! getting this response from the server!', action.payload.data); }
    return {...state, eventList: action.payload.data};

    
  default:
    return state;
  }
};
    
export default geoViewReducer;