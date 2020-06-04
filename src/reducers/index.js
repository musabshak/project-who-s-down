// The starting point for your redux store
// this defines what your store state will look like.
import { combineReducers } from 'redux';

import authReducer from './auth-reducer';
import eventReducer from './eventReducer';
import eventsReducer from './events_reducer';
import eventsReducerSh from './events_reducer_sh';
import geoViewReducer from './geo_view_reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
  events: eventsReducer,
  eventsSh: eventsReducerSh,
  geoViewEvents: geoViewReducer,
});

export default rootReducer;