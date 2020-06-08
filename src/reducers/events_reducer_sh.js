import { ActionTypes } from '../components/event_info/actions';

const initialState = {
  all: [],
  subscribedEvents: [],
  error: null,
};

const EventsReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FETCH_EVENTS:
    return { error: action.error, all: action.payload, subscribedEvents: state.subscribedEvents };
  case ActionTypes.FETCH_SUBSCRIBED_EVENTS:
    return { error: action.error, subscribedEvents: action.payload, all: state.all };
  case ActionTypes.SUBSCRIBE_EVENT:
    return { error: action.error, subscribedEvents: state.subscribedEvents, all: state.all };
  case ActionTypes.UNSUBSCRIBE_EVENT:
    return { error: action.error, subscribedEvents: state.subscribedEvents, all: state.all };
  // case ActionTypes.FETCH_EVENT_FAILED:
  //   return { error: 1, all: state.all };
  // case ActionTypes.FETCH_EVENT_SUCCEEDED:
  //   return { error: 0, all: state.all };
  default:
    return state;
  }
};

export default EventsReducer;
