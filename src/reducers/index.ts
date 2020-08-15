import { combineReducers } from 'redux';

import contributions from './contributions';
import dialogs from './dialogs';
import selectedContribution from './selectedContribution';
import error from './error';

export default combineReducers({
  contributions,
  dialogs,
  selectedContribution,
  error
});
