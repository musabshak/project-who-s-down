import { ActionTypes } from '../components/event_list/actions';

const initialState = {
  all: [],
  myEvents:[],
  subscribedEvents: [],
  imdownEvents: [],
  error: null,
};


const alleventsReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FETCH_EVENTS:
    console.log('inside reducer fetch all events case');
    return {all: action.payload.events};
  case ActionTypes.FETCH_SUBSCRIBED_EVENTS:
    return { error: action.error, subscribedEvents: action.payload, all: state.all };
  case ActionTypes.SUBSCRIBE_EVENT:
    return { error: action.error, subscribedEvents: state.subscribedEvents, all: state.all };
  case ActionTypes.UNSUBSCRIBE_EVENT:
    return { error: action.error, subscribedEvents: state.subscribedEvents, all: state.all };
  case ActionTypes.FETCH_IMDOWN_EVENTS:
    return { ...state, error: action.error, imdownEvents: action.payload};
  case ActionTypes.FETCH_MY_EVENTS:
      return { ...state, error: action.error, myEvents: action.payload};
  case ActionTypes.IMDOWN_EVENT:
    return { ...state, error: action.error};
  case ActionTypes.UNIMDOWN_EVENT:
    return { ...state, error: action.error};
  default:
    // console.log('inside reducer cant fetch cases');
    return state;
  }
};

export default alleventsReducer;

