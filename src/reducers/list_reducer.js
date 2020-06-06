import { ActionTypes } from '../components/event_list/actions';

const initialState = {
  all: [],
};


const alleventsReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FETCH_EVENTS:
    console.log('inside reducer fetch all events case');
    return {all: action.payload.events}; 
  default:
    console.log('inside reducer cant fetch case');
    return state;
  }
};

export default alleventsReducer;
