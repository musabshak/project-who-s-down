import { ActionTypes } from '../components/chat/actions';

const initialState = {
  all: [],
  error: null,
  newText: '',
};


const chatReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FETCH_EVENTS:
    return { error: action.error, all: action.payload };
  case ActionTypes.FETCH_CHAT:
    return { error: action.error, all: action.payload };
  case ActionTypes.NEW_CHAT:
    return {newText: action.payload, error: false, success: true}; 
  default:
    return state;
  }
};

export default chatReducer;
