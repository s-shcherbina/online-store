import React, { useContext, useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// import { grey } from '@mui/material/colors';
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Tab,
  AppBar,
  Button,
} from '@mui/material';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import Goods from '../components/Goods';
import { storage } from './Flower';
import { ArrowBack, Grass, Phone } from '@mui/icons-material';
import Customer from '../components/Customer';
// import { yellow } from '@mui/material/colors'; yellow[500]

const MakeOrder = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const closeBasket = () => {
    storage(store.basket);
    navigate('/group');
  };

  useEffect(() => {
    store.setBasket(JSON.parse(localStorage.getItem('basket')));
  }, [store]);
  return (
    <>
      <AppBar position='static' sx={{ p: 1, bgcolor: 'transparent' }}>
        <Stack
          sx={{ ml: { xs: 1, md: 2 } }}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent='space-between'
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grass sx={{ mt: 0.7 }} color='primary' />
            <Typography
              variant='h6'
              color='primary'
              sx={{ mt: 0.5, ml: 1, fontFamily: "'Lobster', cursive" }}
            >
              РАЙСЬКИЙ САД
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Phone color='primary' fontSize='small' sx={{ mt: 1.3 }} />
            <Typography variant='h6' color='primary' sx={{ mt: 0.5 }}>
              +38 (066) 611 74 29
            </Typography>
          </Box>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => {
              storage(store.basket);
              navigate('/group');
            }}
          >
            Повернутись до покупок
          </Button>
        </Stack>
      </AppBar>
      <Typography variant='h4' sx={{ mt: 1, ml: 3 }}>
        Оформлення замовлення
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper>
            <TabContext value={value}>
              <Box
                sx={{
                  maxWidth: { xs: 300, sm: 600 },
                  bgcolor: 'background.paper',
                }}
              >
                <TabList
                  onChange={handleChange}
                  variant='scrollable'
                  scrollButtons
                >
                  <Tab label='Перше замовлення' value='1' />
                  <Tab label='Замовляли раніше' value='2' />
                </TabList>
                <TabPanel value='1'>
                  <Customer />
                </TabPanel>
              </Box>
            </TabContext>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Stack
              sx={{
                p: { xs: 1, lg: 2 },
              }}
            >
              <Typography variant='h6'>Ваше замовлення</Typography>
              <Goods handleClose={closeBasket} />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default MakeOrder;
