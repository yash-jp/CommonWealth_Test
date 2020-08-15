import { Contributions, Contribution } from '../types/contribution';
import { Action, Actions } from '../types/action';

const contributions = (state: Contributions = {}, action: Action) => {
  switch(action.type){
      case Actions.CONTRIBUTION_DELETE_SUCCESS:{
        const updatedContributions = Object.values<Contribution>(state).filter(contribution => contribution.uuid !== action.uuid);
        console.log(`updated - ${JSON.stringify(updatedContributions)}`);
        return {
          ...updatedContributions
        }
      }

      case Actions.CONTRIBUTION_EDIT_SUCCESS:{
        // now we need to update our main contributions
        const updatedContributions = Object.values<Contribution>(state).map(contribution => {
          if(contribution.uuid === action.uuid){
            return {
              ...action.contribution
            }
          }else{
            return contribution;
          }
        });
        return{
          ...updatedContributions
        }
      }

      default:
        return state;
  }
}

export default contributions;