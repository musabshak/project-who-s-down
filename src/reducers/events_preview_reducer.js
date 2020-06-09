import { ActionTypes } from '../components/event_info/actions';

const initialState = {
  imdownEvents: [],
  error: null,
};

const EventPreviewReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FETCH_IMDOWN_EVENTS:
    return { ...state, error: action.error, imdownEvents: action.payload};
  case ActionTypes.IMDOWN_EVENT:
    return { ...state, error: action.error};
  case ActionTypes.UNIMDOWN_EVENT:
    return { ...state, error: action.error};
  default:
    return state;
  }
};

export default EventPreviewReducer;
