// The starting point for your redux store
// this defines what your store state will look like.
import { combineReducers } from 'redux';

import authReducer from './auth-reducer';
import newEventStatusReducer from './new_event_status_reducer';
import eventsReducerSh from './events_reducer_sh';
import eventPreviewReducer from './events_preview_reducer';
import geoViewReducer from './geo_view_reducers';
import alleventsReducer from './list_reducer';
import chatReducer from './chat_reducer';
import settingsReducer from './settings-reducer';
import modalReducer from './modalReducer';


const rootReducer = combineReducers({
  settings: settingsReducer,
  auth: authReducer,
  newEventStatus: newEventStatusReducer,
  eventsSh: eventsReducerSh,
  geoViewEvents: geoViewReducer,
  list: alleventsReducer,
  chat: chatReducer,
  eventPreview: eventPreviewReducer,
  modal: modalReducer,
});

export default rootReducer;