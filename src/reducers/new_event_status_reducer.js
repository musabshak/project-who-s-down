import { ActionTypes } from '../components/new_event/actions';

const initialState = {
  createdEventTitle: '',
  error: false,
  success: false,
};


const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.NEW_EVENT_SUCCESS:
    console.log('success is true');
    return {createdEventTitle: action.payload, error: false, success: true}; 
  case ActionTypes.NEW_EVENT_ERROR:
    return {createdEventTitle: '', error: true, success: false}; 
  case ActionTypes.RESET_BACKEND_STATUS:
    return {createdEventTitle: '', error: false, success: false}; 
  default:
    return state;
  }
};

export default eventsReducer;