import { Actions } from '../action';
import { WithContribution } from '../contribution';

export interface ContributionSelect extends WithContribution {
  type: Actions.CONTRIBUTION_SELECT;
}

export interface ContributionEdit {
  type: Actions.CONTRIBUTION_EDIT;
}

export interface SelectClear {
  type: Actions.SELECTED_CLEAR;
}

export interface ContributionEditDismiss {
  type: Actions.CONTRIBUTION_EDIT_DISMISS;
}

export interface ContributionDeleteSuccess {
  type: Actions.CONTRIBUTION_DELETE_SUCCESS,
  uuid: String
}

export interface ContributionEditSuccess {
  type: Actions.CONTRIBUTION_EDIT_SUCCESS,
  uuid: String,
  contribution: WithContribution
}

export interface OperationFailure {
  type: Actions.FAILURE,
  error: boolean,
}