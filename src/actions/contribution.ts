import { Actions } from '../types/action';
import { Contribution } from '../types/contribution';

export const contributionSelect = (contribution: Contribution) => {
  console.log(`contribution - ${JSON.stringify(contribution)}`);
  return ({
    contribution,
    type: Actions.CONTRIBUTION_SELECT,
  });
}

export const contributionEdit = () => ({
  type: Actions.CONTRIBUTION_EDIT,
});

export const contributionEditDismiss = () => ({
  type: Actions.CONTRIBUTION_EDIT_DISMISS,
});
