import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { contributionEdit, initDelete } from './actions/contribution';
import Contributions from './components/Contributions/Contributions';
import ContributionEdit from './components/ContributionEdit/ContributionEdit';
import { getSelected } from './selectors/contributions';

// to show notification
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// for confirmation modal
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

// to get status of contribution
import { Status } from './types/contribution';

const App = () => {
  // this will have the selected contribution
  const selected = useSelector(getSelected);
  console.log(`selected - ${selected}`);
  const dispatch = useDispatch();

  // to toggle snackbar
  const [open, setOpen] = useState(false);

  // to open confirmation modal
  const [modal, setModal] = useState(false);

  function Alert(props : any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function PaperComponent(props : any) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }

  // const handleClickOpen = () => {
  //   setModal(true);
  // };

  const handleClickClose = () => {
    setModal(true);
  };

  const handleClose = (event : any, reason : any) => {
    // it will close snackbar
    setOpen(false);
  };

  const handleCancel = () => {
    // check selected contributio's status
    if(selected?.status === Status.Pending){
      // ask for confirmation
      setModal(true);
      // //perform delete operation
      // dispatch(initDelete(selected.uuid));
    }else{
      // open snakbar and show user warning
      setOpen(true);
    }
  }

  const handleEdit = () => {
    // check selected contributio's status
    if(selected?.status === Status.Pending){
      dispatch(contributionEdit());
    }else{
      // open snakbar and show user warning
      setOpen(true);
    }
  }

  const handleDialogConfirm = () => {
      //perform delete operation
      if(selected?.uuid){
        dispatch(initDelete(selected?.uuid));
        setModal(false);
      }
      
  }

  const handleDialogClose = () => {
    setModal(false);
  }

  return (
    <>
     <Dialog
        open={modal}
        onClose={handleClickClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Are you sure you want to cancel this contribution?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
     <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          sorry! you can only edit or cancel PENDING contributions :(
        </Alert>
      </Snackbar>
      <Card>
        <CardHeader title="My Contributions" />
        <CardContent>
          <Contributions />
        </CardContent>
        <CardActions>
          <Button disabled={!selected} onClick={handleEdit}>Edit</Button>
          <Button disabled={!selected} onClick={handleCancel}>Cancel</Button>
        </CardActions>
      </Card>
      <ContributionEdit />
    </>
  );
}

export default App;
