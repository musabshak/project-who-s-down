/* eslint-disable no-plusplus */
/* eslint-disable no-case-declarations */
// ^so this linter rule is intended to prevent bugs related to "falling through" where multiple cases get triggered in 
// a case/switch construct but since I'm using return in my cases I just disabled it

import { ActionTypes } from '../components/geographic_view/actions';

const masterDebug = false;

const initialState = {
  filteredOut: {
    categories: [],
    skillLevels: [],
    timesAfter: null, // going to need a better way to handle times
    timesBefore: null,
  },
  eventList: [],

};
  
  
const geoViewReducer = (state = initialState, action, debug = false, debug2 = false) => {
  // I coded this pretty defensively, so there are a lot of checks to make sure we don't mess up the store
  // I also put a lot of logic in fetchEvents so the refresh button was more powerful/useful

  if (masterDebug) { console.log('in geo view reducer!'); }
  if (action.payload && masterDebug) {
    console.log('action.payload:', action.payload);
  }
  switch (action.type) {
  case ActionTypes.changeFilters: 
    if (masterDebug) {
      console.log('in actiontypes change filters'); }
    if (debug || masterDebug) {
      console.log('incoming state:', state);
      console.log('action.payload', action.payload);
      console.log('state.filteredOut:', state.filteredOut);
    }
    
    if (!state.filteredOut) {
      console.log('state.filteredOut did not exist, so we just returned empty filters');
      return {filteredOut: initialState.filteredOut};
    }

    // because Times have a date object while cats and skills are arrays, they are separated here. This is cats/skills 
    if (action.payload.FilterType === 'categories' || action.payload.FilterType === 'skillLevels') {
      const newFilterInstance = action.payload.SpecificFilter; 

      if (state.filteredOut[action.payload.FilterType].includes(newFilterInstance)) {
        if (masterDebug) { console.log('\n\n\nwe have detected the filter is already there, so we ought to remove it!'); }
        const index = state.filteredOut[action.payload.FilterType].indexOf(newFilterInstance);
        if (index > -1) {
          if (masterDebug) { console.log('old state:', state.filteredOut); }
          const newState = state.filteredOut;
          newState[action.payload.FilterType].splice(index, 1);
          if (masterDebug) { console.log('new state:', newState); }
          return {filteredOut: newState};
        }

        else {
          console.log('something went wrong, we just got a negative index from an array when we asked for an item location. This is that index:', index);
        }
      }

      else {
        const newFiltersToAdd = state.filteredOut[action.payload.FilterType].concat(newFilterInstance); // need to check if already in the list
        const newState = state.filteredOut;
        newState[action.payload.FilterType] = newFiltersToAdd;
        if (masterDebug) { console.log('reducer returning this:', newState); }
        return {filteredOut: newState};
      }
    }

    // and this is times
    if (action.payload.FilterType === 'timesBefore') {
      if (masterDebug) { console.log('in the reducer for before'); }
      const newState = state.filteredOut;
      newState.timesBefore = action.payload.SpecificFilter;
      if (masterDebug) { console.log('setting this as our new filteredOut!', newState); }

      return {...state, filteredOut: newState};
    }

    if (action.payload.FilterType === 'timesAfter') {
      if (masterDebug) { console.log('in the reducer for after'); }
      const newState = state.filteredOut;
      newState.timesAfter = action.payload.SpecificFilter;
      if (masterDebug) { console.log('setting this as our new filteredOut!', newState); }
      return {...state, filteredOut: newState};
    }


    else {
      console.log('this filter is not currently supported, returning the state as it was. Also curious how you managed to even pick that option.');
      return state;
    }

    // this case should never occur either, this function was used to help debug
  case ActionTypes.initializeFilters:
    if (masterDebug) { console.log('in the reducer for initialize filters'); }
    return {...state, filteredOut: initialState.filteredOut};


  case ActionTypes.fetchEvents: // so filtering is handled here
    if (debug2 || masterDebug) {
      console.log('\n\n\n\n\nin the reducer! getting events like this from the server!', action.payload.data[0]); }
    
    const eventList = action.payload.data;
    const filteredEventList = [];
    if (!state.filteredOut) {
      if (masterDebug) { console.log('no filters detected, returning all events!'); }
      return {...state, eventList: action.payload.data}; 
    }
    else {
      if (masterDebug) {
        console.log('we are in fetch events!');
        console.log('state.filteredOut:', state.filteredOut);
      }

      // if it passes the category and skill filters, add it to a list
      for (let i = 0; i < eventList.length; i++) {
        if (masterDebug) { console.log('these are all our events', eventList[i].category, eventList[i].skillLevel); }
        if (!state.filteredOut.categories.includes(eventList[i].category) && !state.filteredOut.skillLevels.includes(eventList[i].skillLevel)) {
          filteredEventList.push(eventList[i]);
          if (masterDebug) { console.log('just added ', eventList[i], 'to filtered event list!'); }
        }
        else if (masterDebug) { console.log('we just filtered this one out!', eventList[i]); }
      }

      // and if it doesn't pass the time filter, remove it from that list
      if (state.filteredOut.timesAfter) {
        if (masterDebug) { console.log('filtering out times after!'); }
        for (let i = 0; i < filteredEventList.length; i++) {
          if (Date.parse(filteredEventList[i].startTime) > state.filteredOut.timesAfter.getTime()) {
            filteredEventList.splice(i, 1); // so if the event start time is after the time you're filtering for, remove it
            const deletedEvents = filteredEventList.splice(i, 1);
            if (masterDebug) { console.log('deleted this event!', deletedEvents); }
          }
        }
      }

      if (state.filteredOut.timesBefore) {
        console.log('filtering out times before!');
        for (let i = 0; i < filteredEventList.length; i++) {
          if (Date.parse(filteredEventList[i].startTime) < state.filteredOut.timesBefore.getTime()) {
            const deletedEvents = filteredEventList.splice(i, 1); // so if the event start time is before the time you're filtering for, remove it
            // filter for times before
            console.log('deleted this event!', deletedEvents);
          }
        }
      }


      return {...state, eventList: filteredEventList}; 
    }

    
  default:
    return state;
  }
};
    
export default geoViewReducer;