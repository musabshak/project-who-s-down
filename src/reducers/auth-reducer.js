import { ActionTypes } from '../components/signin/actions';

const initialState = {
  authenticated: false,
  userName: '',
  signinMsg: '',
  signupMsg: '',
  token: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.AUTH_USER:
    return {
      authenticated: true, userName: action.userName, token: action.token, signinMsg: '', signupMsg: '',
    };
  case ActionTypes.DEAUTH_USER:
    return {
      authenticated: false, userName: '', token: action.token, signinMsg: '', signupMsg: '',
    };
  case ActionTypes.AUTH_ERROR:
    return {
      authenticated: state.authenticated, userName: state.userName, token: state.token, signinMsg: action.signinMsg, signupMsg: action.signupMsg,
    };
  default:
    return state;
  }
};

export default AuthReducer;
