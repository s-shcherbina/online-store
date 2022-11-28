import React, { useContext, useEffect } from 'react';
import { AppBar, Box } from '@mui/material';
import SubGroupButton from '../helpers/SubGroupButton';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { getGroups } from '../../http/groupAPI';

const NavBarBottom = observer(() => {
  const { store } = useContext(Context);
  useEffect(() => {
    getGroups().then((data) => store.setGroups(data));
  }, [store]);
  console.log(store.groups);
  return (
    <AppBar position='static' color='default'>
      <Box
        sx={{
          display: {
            xs: 'flex',
            sm: 'inline-block',
            lg: store.groups.length < 9 ? 'flex' : 'inline-block',
          },
          flexDirection: {
            xs: 'column',
            sm: 'row',
            justifyContent: 'space-around',
          },
        }}
      >
        {store.groups.map((group) => (
          <SubGroupButton key={group.id} group={group} />
        ))}
      </Box>
    </AppBar>
  );
});

export default NavBarBottom;
