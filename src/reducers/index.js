// The starting point for your redux store
// this defines what your store state will look like.
import { combineReducers } from 'redux';

import authReducer from './auth-reducer';
import newEventStatusReducer from './new_event_status_reducer';
import eventsReducerSh from './events_reducer_sh';
import geoViewReducer from './geo_view_reducers';
import alleventsReducer from './list_reducer';
import chatReducer from './chat_reducer';


const rootReducer = combineReducers({
  auth: authReducer,
  newEventStatus: newEventStatusReducer,
  eventsSh: eventsReducerSh,
  geoViewEvents: geoViewReducer,
  list: alleventsReducer,
  chat: chatReducer,
});

export default rootReducer;