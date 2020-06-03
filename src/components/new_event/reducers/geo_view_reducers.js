import { ActionTypes } from '../../geographic_view/actions';


const initialState = {
  filteredOut: {
    categories: [],
    skillLevels: [],
    timesAfter: null, // going to need a better way to handle times
    timesBefore: null,
  },
};
  
  
const geoViewReducer = (state = initialState, action, debug = true) => {
  console.log('hi!');
  if (action.payload && debug) {
    // const newFilterInstance = action.payload.SpecificFilter; 
    // const newFilters = state.filteredOut;
    // console.log('newfilters=', newFilters);
    // console.log('newFilterInstance=', newFilterInstance);
    // console.log(newFilters[action.payload.FilterType]);
    console.log('state provided to reducer', state);
  }
  switch (action.type) {
  case ActionTypes.changeFilters:
    if (debug) {
      console.log('Ok, so we\'re in the reducer for the case changeFilters and this is our current state:', state);
    }

    if (action.payload.FilterType === 'categories' || action.payload.FilterType === 'skillLevels') {
      console.log('new filter = ', state.filteredOut[action.payload.FilterType].concat(action.payload.SpecificFilter));
      return { ...state, filteredOut: state.filteredOut[action.payload.FilterType].concat(action.payload.SpecificFilter)};
    }

    else {
      return state;
    }
    
  default:
    return state;
  }
};
    
export default geoViewReducer;