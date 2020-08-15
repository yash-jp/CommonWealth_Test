import TextField from '@material-ui/core/TextField';
// removed Formik as using only materialUI TextField
// import { Field } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';

// selector, to prefill the tfsa textfield value
import { getSelected } from '../../selectors/contributions';

const Rrsp = (props:any) => {
  const selected = useSelector(getSelected);
  return(<div>
    <TextField
      error={props.error}
      id="standard-rrsp"
      label="TFSA Contribution"
      helperText="Please input TFSA contribution more than 0"
      type='number'
      defaultValue={selected?.tfsa}
      onChange={props.tfsaChange}
    />
  </div>);
}

export default Rrsp;
