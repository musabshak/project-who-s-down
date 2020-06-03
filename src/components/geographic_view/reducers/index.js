import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import eventReducer from './eventReducer';


const rootReducer = combineReducers({
  map: mapReducer,
  event: eventReducer,

});


export default rootReducer;
