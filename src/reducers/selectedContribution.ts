import { Action, Actions } from '../types/action';
import { Contribution } from '../types/contribution';

const selectedContribution = (state: Nullable<Contribution> = null, action: Action) => {
  switch(action.type) {
    case Actions.CONTRIBUTION_SELECT:
      return {
        ...action.contribution
      };

      case Actions.SELECTED_CLEAR:
        // let newState = {type:null};
      return null;

    default:
      return state;
  }
};

export default selectedContribution;
