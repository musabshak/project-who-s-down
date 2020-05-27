// The starting point for your redux store
// this defines what your store state will look like.
import { combineReducers } from 'redux';

import eventsReducer from './events_reducer';

const rootReducer = combineReducers({
  events: eventsReducer,
});

export default rootReducer;