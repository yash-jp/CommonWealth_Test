import List from '@material-ui/core/List';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getList } from '../../selectors/contributions';
import Contribution from '../Contribution/Contribution';

import { initContributions } from '../../actions/contribution';

const Contributions: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initContributions());
  }, [dispatch]);

  const contributions = useSelector(getList);
  console.log(JSON.stringify(contributions));

  return (
    <List>
      {contributions.map(
        contribution => <Contribution key={contribution.uuid} contribution={contribution} />
      )}
    </List>
  );
};

export default Contributions;
