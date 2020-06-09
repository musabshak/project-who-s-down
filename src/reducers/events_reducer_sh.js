import { ActionTypes } from '../components/event_info/actions';

const initialState = {
  all: [],
  subscribedEvents: [],
  imdownEvents: [],
  error: null,
};

const EventsReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FETCH_EVENTS:
    return { ...state, error: action.error, all: action.payload, subscribedEvents: state.subscribedEvents };
  case ActionTypes.FETCH_SUBSCRIBED_EVENTS:
    return { ...state, error: action.error, subscribedEvents: action.payload, all: state.all };
  case ActionTypes.SUBSCRIBE_EVENT:
    return { ...state, error: action.error, subscribedEvents: state.subscribedEvents, all: state.all };
  case ActionTypes.UNSUBSCRIBE_EVENT:
    return { ...state, error: action.error, subscribedEvents: state.subscribedEvents, all: state.all };
  case ActionTypes.FETCH_IMDOWN_EVENTS:
    return { ...state, error: action.error, imdownEvents: action.payload};
  case ActionTypes.IMDOWN_EVENT:
    return { ...state, error: action.error, imdownEvents: [ ...state.imdownEvents, action.addedEvent ]};
  case ActionTypes.UNIMDOWN_EVENT:
    // console.log('reducer: ')
    // console.log('prev length :', state.imdownEvents.length, state.imdownEvents);
    // console.log('removing: ',action.removedEvent);
    let li = [];
    for (let i = 0; i < state.imdownEvents.length; i++) 
      if (state.imdownEvents[i].id !== action.removedEvent.id) li = [ ...li, state.imdownEvents[i] ];
      // console.log('result:', li.length, li);
    return { ...state, error: action.error, imdownEvents: [...li]};
  // case ActionTypes.FETCH_EVENT_FAILED:
  //   return { error: 1, all: state.all };
  // case ActionTypes.FETCH_EVENT_SUCCEEDED:
  //   return { error: 0, all: state.all };
  default:
    return state;
  }
};

export default EventsReducer;
