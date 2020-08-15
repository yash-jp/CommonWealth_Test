import { Action, Actions } from '../types/action';
import { Error } from '../types/contribution';

const error = (state: Error = { error:false } , action: Action) => {
  switch(action.type) {
    // when any of endpoints gets failed
    case Actions.FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
};

export default error;
