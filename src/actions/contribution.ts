import { Actions } from '../types/action';
import { Contribution } from '../types/contribution';

// axios to make asynchronous requests
import axios from 'axios';

// store.json file
import initialData from '../store.json';
// import Contribution from '../components/Contribution/Contribution';


export const contributionSelect = (contribution: Contribution) => {
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

// to get all contributions from server
// currently we are hydrating store inside the createStore function inside store.ts to set up initial store
export const initContributions = () => {
  // because of thunk we get dispatch, to execute asynchronous code
  return (dispatch: any) => {
    // faking API call
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
      console.log(`initdata - ${JSON.stringify(initialData)}`)
      dispatch(setContributions(initialData));
    })
    .catch(error => {
      console.log('error');
    });
  }
}

// this is synchronous action creater will be called fron initContributions where we will replicate asynchronous code using dummy real api and on success we will call this function, where we are passing all the data stored in the store.json file as a parameter
// it will return specific type and payload with all the contributions thus corresponding reducer will listen and take care of setting data
export const setContributions = (contributions: any) => {
    return {
    type: Actions.CONTRIBUTION_SET,
    contributions
  }
}

export const initDelete = (uuid : String) => {
  return (dispatch : any) => {
    // faking DELETE API CALL, as this domain dosen't exist so we will treat failure as success, and succes as failure
    // we are following core REST protocols where we pass uuid as a path parameter to DELETE API
    axios.delete(`https://domain.com/contributions/${uuid}`)
    .then(response => {
      // failure so handle failure
      dispatch(handleFailure(true));
    })
    .catch(error => {
      // resource has been deleted so we call update all contribution, and slice of deleted resource
      dispatch(handleFailure(false));
      dispatch(handleDeleteSuccess(uuid));
      // clear selected one from state
      dispatch(selectClear());
    });
  }
}

// to handle Failure in API call, I have mde it general for every API
export const handleFailure = (error: boolean) => {
  return {
    type: Actions.FAILURE,
    error
  }
}

export const handleDeleteSuccess = (uuid : String) => {
  return {
    type: Actions.CONTRIBUTION_DELETE_SUCCESS,
    uuid
  }
}


export const initEdit = (uuid: String, contribution: Contribution) => {
  console.log(`inside initEdit - ${uuid}, ${contribution}`);
  return (dispatch: any) => {
    // faking EDIT API CALL, as this domain dosen't exist so we will treat failure as success, and succes as failure
    // we are following core REST protocols where we pass uuid as a path parameter to DELETE API
    axios.put(`https://domain.com/contributions/${uuid}`)
    .then(response => {
      // failure so handle failure
      dispatch(handleFailure(true));
    })
    .catch(error => {
      // resource has been deleted so we call update all contribution, and slice of deleted resource
      dispatch(handleFailure(false));
      dispatch(editSuccess(uuid, contribution));
      // clear selected one from state
      dispatch(selectClear());
      // close the EDIT modal
      dispatch(contributionEditDismiss());
    });
  }
}

export const editSuccess = (uuid: String, contribution: Contribution) => {
  console.log(`inside edit success`);
  return {
    type: Actions.CONTRIBUTION_EDIT_SUCCESS,
    uuid,
    contribution
  }
}

export const selectClear = () => {
  return {
    type: Actions.SELECTED_CLEAR,
  }
}
