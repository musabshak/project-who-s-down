// The starting point for your redux store
// this defines what your store state will look like.
import { combineReducers } from 'redux';

import eventsReducer from './events_reducer';
import geoViewReducer from './geo_view_reducers';

const rootReducer = combineReducers({
  events: eventsReducer,
  geoViewEvents: geoViewReducer,
});

export default rootReducer;