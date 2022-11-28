import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import { Context } from '../..';

const Buttons = ({ items, endItem }) => {
  // const { store } = useContext(Context);
  const navigate = useNavigate();

  return (
    <Box sx={{ m: 0.5, display: { xs: 'inline-block', sm: 'flex' } }}>
      {items.map((item, i) => (
        <Button
          key={i}
          size='small'
          endIcon={<KeyboardArrowRight />}
          onClick={() => {
            navigate('/' + item.nav);
            // store.setPage(item.nav);
          }}
        >
          {item.label}
        </Button>
      ))}
      <Typography
        variant='body2'
        color='secondary'
        sx={{ m: 0.7, fontSize: 13, fontWeight: 500 }}
      >
        {endItem && endItem.toUpperCase()}
      </Typography>
    </Box>
  );
};

export default Buttons;
