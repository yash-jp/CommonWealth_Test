import { ContributionSelect, ContributionEdit, ContributionEditDismiss,ContributionDeleteSuccess, OperationFailure, SelectClear, ContributionEditSuccess } from './action/contributions';

export enum Actions {
  CONTRIBUTION_EDIT = 'CONTRIBUTION_EDIT',
  CONTRIBUTION_EDIT_DISMISS = 'CONTRIBUTION_EDIT_DISMISS',
  CONTRIBUTION_SELECT = 'CONTRIBUTION_SELECT',

  // defining required action constants
  CONTRIBUTION_SET = 'CONTRIBUTION_SET',

  // for delete
  CONTRIBUTION_DELETE_INIT='CONTRIBUTION_DELETE_INIT',
  CONTRIBUTION_DELETE_SUCCESS='CONTRIBUTION_DELETE_SUCCESS',

  // for editing contribution
  CONTRIBUTION_EDIT_INIT='CONTRIBUTION_EDIT_INIT',
  CONTRIBUTION_EDIT_SUCCESS='CONTRIBUTION_EDIT_SUCCESS',

  // any failure of asynchronous operation
  FAILURE='FAILURE',

  // to clear selected contribution
  SELECTED_CLEAR='SELECTED_CLEAR',
}

export type Action = ContributionEdit
  | ContributionEditDismiss
  | ContributionSelect
  | ContributionDeleteSuccess
  | OperationFailure
  | SelectClear
  | ContributionEditSuccess
  ;
