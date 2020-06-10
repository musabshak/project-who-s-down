import { ActionTypes } from '../components/chat/actions';

const initialState = {
  all: [],
  error: null,
  newText: '',
  timer: null,
};


const chatReducer = (state = initialState, action) => {
  switch (action.type) {
  // case ActionTypes.FETCH_EVENTS:
  //   return { error: action.error, all: action.payload };
  case ActionTypes.FETCH_CHAT:
    // console.log('chatReducer: ', action.payload);
    return { ...state, error: action.error, all: action.payload };
  case ActionTypes.NEW_CHAT:
    return {
      ...state, newText: action.payload, error: false, success: true,
    }; 
  case ActionTypes.SET_CHAT_TIMER:
    return {
      ...state, error: action.error, timer: action.payload, test: action.test,
    }; 
  case ActionTypes.CLEAR_CHAT:
    console.log('clear chat');
    return {
      ...state, 
      all: initialState.all,
      error: action.error,
    }; 
  default:
    return state;
  }
};

export default chatReducer;
