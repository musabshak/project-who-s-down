/* eslint-disable no-case-declarations */
// ^so this linter rule is intended to prevent bugs related to "falling through" where multiple cases get triggered in 
// a case/switch construct but since I'm using return in my cases I just disabled it

import { ActionTypes } from '../components/geographic_view/actions';


const initialState = {
  filteredOut: {
    categories: [],
    skillLevels: [],
    timesAfter: null, // going to need a better way to handle times
    timesBefore: null,
  },
  eventList: [],

};
  
  
const geoViewReducer = (state = initialState, action, debug = true, debug2 = false) => {
  console.log('in geo view reducer!');
  if (action.payload) {
    // console.log('action.payload:', action.payload);
    // const newFilterInstance = action.payload.SpecificFilter; 
    // const oldFilters = state.filteredOut;
  }
  switch (action.type) {
  case ActionTypes.changeFilters: 
    console.log('in actiontypes change filters');
    if (debug) {
      console.log('incoming state:', state);
      console.log('action.payload', action.payload);
      console.log('state.filteredOut:', state.filteredOut);
    }
    
    if (!state.filteredOut) {
      // need to set state.filtered out
      console.log('state.filteredOut did not exist, so we just returned empty filters');
      return {filteredOut: initialState.filteredOut};
    }

    if (action.payload.FilterType === 'categories' || action.payload.FilterType === 'skillLevels') {
      const newFilterInstance = action.payload.SpecificFilter; 
      const newFiltersToAdd = state.filteredOut[action.payload.FilterType].concat(newFilterInstance); // need to check if already in the list
      const newState = state.filteredOut;
      newState[action.payload.FilterType] = newFiltersToAdd;
      console.log('reducer returning this:', newState);

      //   return {...state, filteredOut: newState};
      return {filteredOut: newState};
    }

    else {
      console.log('we just got elsed!');
      return state;
    }

  case ActionTypes.initializeFilters:
    console.log('in the reducer for initialize filters');
    return {...state, filteredOut: initialState.filteredOut};

  case ActionTypes.fetchEvents: // so filtering is handled here
    if (debug2) {
      console.log('\n\n\n\n\nin the reducer! getting events like this from the server!', action.payload.data[0]); }
    
    const eventList = action.payload.data;
    const filteredEventList = [];
    if (!state.filteredOut) {
      console.log('no filters detected, returning all events!');
      return {...state, eventList: action.payload.data}; 
    }
    else {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < eventList.length; i++) {
        console.log(eventList[i].category, eventList[i].skillLevel);
      }

      return {...state, eventList: action.payload.data}; 
    }

    
  default:
    return state;
  }
};
    
export default geoViewReducer;