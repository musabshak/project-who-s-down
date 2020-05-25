import { ActionTypes } from '../actions';

const initialState = {
  newEvent: [],
};


const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.CREATE_EVENT:
    console.log('inside reducer create event case');
    return {newEvent: action.payload}; 
  default:
    console.log('inside reducer default case');
    return state;
  }
};

export default eventsReducer;