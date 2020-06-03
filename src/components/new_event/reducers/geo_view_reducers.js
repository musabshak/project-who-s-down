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
    if (debug) {
    //   console.log('oldfilters=', oldFilters);
    //   console.log('newFilterInstance=', newFilterInstance);
    //   console.log('part of oldFilters to be replaced:', oldFilters[action.payload.FilterType]);
    //   console.log('state provided to reducer', state);
    //   console.log('\n\n\n');
    //   // note that if you run this debug block, you'll be adding to the filter list twice
    //   const newFiltersAdded = oldFilters[action.payload.FilterType].concat(newFilterInstance);
    //   const newState = state;
    //   newState.filteredOut[action.payload.FilterType] = newFiltersAdded;
    //   console.log('\n\n\n We have this as the newState for our reducer', newState); 
    }
  }
  switch (action.type) {
  case ActionTypes.changeFilters: 
    if (debug) {
      console.log(newState); 
    }

    if (action.payload.FilterType === 'categories' || action.payload.FilterType === 'skillLevels') {
      const newFilterInstance = action.payload.SpecificFilter; 
      const newFiltersToAdd = state.filteredOut[action.payload.FilterType].concat(newFilterInstance); // need to check if already in the list
      const newState = state;
      newState.filteredOut[action.payload.FilterType] = newFiltersToAdd;
      console.log('reducer returning this:', newState);

      return {...state, filteredOut: newState};
    }

    else {
      return state;
    }
    
  default:
    return state;
  }
};
    
export default geoViewReducer;