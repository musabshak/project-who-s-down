import { ActionTypes } from '../components/event_info/actions';

const initialState = {
  all: [],
  error: null,
};

const EventsReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FETCH_EVENTS:
    return { error: action.error, all: action.payload };
  // case ActionTypes.FETCH_EVENT_FAILED:
  //   return { error: 1, all: state.all };
  // case ActionTypes.FETCH_EVENT_SUCCEEDED:
  //   return { error: 0, all: state.all };
  default:
    return state;
  }
};

export default EventsReducer;
