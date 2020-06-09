import { ActionTypes } from '../components/event_preview/actions';


const ModalReducer = (state = 0, action) => {
  switch (action.type) {
  case ActionTypes.INCREMENT:
    return state + 2;
  default:
    return state;
  }
};


export default ModalReducer;