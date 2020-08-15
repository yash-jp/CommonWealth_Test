import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { Formik, Form } from 'formik';
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { contributionEditDismiss, initEdit } from '../../actions/contribution';
import { isVisible } from '../../selectors/dialogs';
import { Dialogs } from '../../types/dialog';
import { State } from '../../types/store';
import Tfsa from '../Tfsa/Tfsa';
import Rrsp from '../Rrsp/Rrsp';
import classes from './ContributionEdit.module.scss';

// selectors
import { getSelected } from '../../selectors/contributions';

const ContributionEdit = () => {
  // selected contribution value
  const selectedContribution = useSelector(getSelected);

  // to hold tfsa value in local state
  const [rrspValue,setRrspValue] = useState('');
  const [rrspError,setRrspError] = useState(false);
  const [tfsaValue,setTfsaValue] = useState('');
  const [tfsaError,setTfsaError] = useState(false);

  
  const visible = useSelector<State, boolean>(state => isVisible(state, Dialogs.contributionEdit));
  const dispatch = useDispatch();
  const dismiss = () => dispatch(contributionEditDismiss());

  // every time selectedContribution changes this effect will run
  useEffect(()=>{
    if(selectedContribution!==null){
      setRrspValue(selectedContribution.rrsp.toString());
      setTfsaValue(selectedContribution.tfsa.toString());
    }
  },[selectedContribution]);

  const onRrspChange = (e:any) => {
    let val = e.target.value;
    if(val<=0){
      setRrspError(true);
    }else{
      setRrspError(false);
      setRrspValue(val);
    }
  }

  const onTfsaChange = (e:any) => {
    let val = e.target.value;
    if(val<=0){
      setTfsaError(true);
    }else{
      setTfsaError(false);
      setTfsaValue(val);
    }
  }

  const handleAccept = () => {
    // first we need to update rrsp, tfsa and total inside selected contribution
    if(selectedContribution!==null){
      selectedContribution.rrsp=parseInt(rrspValue.toString());
      selectedContribution.tfsa=parseInt(tfsaValue.toString());
      selectedContribution.total = selectedContribution.rrsp + selectedContribution.tfsa;
    
    
    // now we need to update selectedContribution to main Contribution list (in server, sowe will replicate API call)
    dispatch(initEdit(selectedContribution?.uuid, selectedContribution));
    }
  }

  return (
    <Dialog open={!!visible} onClose={dismiss}>
      <DialogTitle>Edit Contribution</DialogTitle>
      
          <div>
            <DialogContent classes={{ root: classes.content }}>
              <Rrsp rrspChange = {onRrspChange} error={rrspError}/>
              <Tfsa tfsaChange = {onTfsaChange} error={tfsaError}/>
            </DialogContent>
            <DialogActions>
               {/* combination of both error to disable cancel button if wrong value is there(kind of frontend validation) */}
              <Button onClick={dismiss}>Cancel</Button>
              <Button disabled={(rrspError||tfsaError)?true:false} onClick={handleAccept}>Accept</Button>
            </DialogActions>
          </div>
   
 
    </Dialog>
  );
};

export default ContributionEdit;
