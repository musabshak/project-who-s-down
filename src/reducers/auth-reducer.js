import { ActionTypes } from '../components/event_info/actions';

const initialState = {
  authenticated: false,
  msg: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.AUTH_USER:
    return { authenticated: true, msg: null };
  case ActionTypes.DEAUTH_USER:
    return { authenticated: false, msg: null };
  case ActionTypes.AUTH_ERROR:
    return { authenticated: state.authenticated, msg: action.payload };
  default:
    return state;
  }
};

export default AuthReducer;
