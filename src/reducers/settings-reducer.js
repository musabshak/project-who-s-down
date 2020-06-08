import { ActionTypes } from '../components/settings/actions';

const initialState = {notifNumber: 0};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.updateNotifNumber:
    console.log('in settingsReducer! action.payload=', action.payload);
    return {notifNumber: action.payload};
  default:
    console.log('inside setting default reducer');
    return null;
  }
};

export default settingsReducer;