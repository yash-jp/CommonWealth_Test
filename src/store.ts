import addDays from 'date-fns/addDays';
import subMonths from 'date-fns/subMonths';
import { createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
// removing this as I want to use thunk middleware, so to use both I need to have composeEnhancers
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from './reducers';
import preloadedState from './store.json';
import { Contributions } from './types/contribution';
import { State } from './types/store';

// redux-thunk to handle asynchronous actions
import thunk from 'redux-thunk';

// composeEnhancers to use redux-dev-tools
const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const transformState = ({ contributions, dialogs }: any, startDate: Date): State => ({
  dialogs,
  selectedContribution: null,
  contributions: contributions.reduce((result: Contributions, { uuid, status, tfsa, rrsp }: any, index: number) => ({
    ...result,
    [uuid]: {
      uuid,
      status,
      tfsa,
      rrsp,
      total: tfsa + rrsp,
      date: subMonths(startDate, index),
    }
  }), {})
});

// instead of co
export const createStore = (startDate: Date) => 
  reduxCreateStore(rootReducer, transformState(preloadedState, startDate), composeEnhancers(
    applyMiddleware(thunk)
  ));

const store = createStore(addDays(new Date(), 15));

export default store;
