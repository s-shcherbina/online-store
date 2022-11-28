import React, { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Typography,
  Stack,
  Autocomplete,
  TextField,
  Badge,
} from '@mui/material';
import {
  Grass,
  Phone,
  ShoppingBasket,
  Search,
  LocalFlorist,
  Yard,
} from '@mui/icons-material';
import { blue, yellow } from '@mui/material/colors';
import { top100Films } from '../../top100Films';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { storage } from '../../pages/Flower';
import BasketWindow from '../BasketWindow';

const NavBarMiddle = observer(() => {
  const { store } = useContext(Context);
  const [color, setColor] = useState(blue[700]);
  const [basket, setBasket] = useState(false);
  const handleCloseBasket = () => {
    storage(store.basket);
    setBasket(false);
  };

  useEffect(() => {
    store.setBasket(JSON.parse(localStorage.getItem('basket')));
  }, [store]);

  return (
    <Box>
      <AppBar position='static' sx={{ p: 0.5, bgcolor: yellow[500] }}>
        <Stack
          sx={{ ml: { xs: 1, md: 2 } }}
          direction='row'
          justifyContent={'space-around'}
        >
          <Box sx={{ display: 'flex' }}>
            <Grass sx={{ mt: 0.7 }} color='primary' />
            <Typography
              variant='h6'
              color='primary'
              sx={{ mt: 0.5, ml: 1, fontFamily: "'Lobster', cursive" }}
            >
              РАЙСЬКИЙ САД
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Phone color='primary' fontSize='small' sx={{ mt: 1.3 }} />
            <Typography variant='h6' color='primary' sx={{ mt: 0.5 }}>
              +38 (066) 611 74 29
            </Typography>
          </Box>
          <Typography
            variant='h6'
            color='primary'
            sx={{ mt: 0.5, display: { xs: 'none', lg: 'flex' } }}
          >
            <>Працюємо:</> <>8:00 - 21:00</>
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Autocomplete
              options={top100Films}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <Box sx={{ display: 'flex' }}>
                      <Search color='primary' />{' '}
                      <Box sx={{ color: blue[700] }}>пошук</Box>
                    </Box>
                  }
                  size='small'
                  sx={{ bgcolor: yellow[200] }}
                />
              )}
            />
          </Box>
          <Button
            variant='contained'
            startIcon={
              <Badge
                badgeContent={
                  store.basket &&
                  [...store.basket].reduce((sum, item) => sum + item.number, 0)
                }
                color='success'
              >
                <ShoppingBasket />
              </Badge>
            }
            sx={{ bgcolor: yellow[500], color: color }}
            onMouseOver={() => setColor(yellow[500])}
            onMouseOut={() => setColor(blue[700])}
            onClick={() =>
              store.basket && store.basket.length && setBasket(true)
            }
          >
            {store.basket &&
              [...store.basket].reduce(
                (sum, item) => sum + item.price * item.number,
                0
              )}{' '}
            <Box sx={{ mt: 0.5, ml: 0.2, fontSize: 9 }}> грн</Box>
          </Button>
        </Stack>
      </AppBar>
      <AppBar
        position='static'
        color='default'
        sx={{ display: { xs: 'block', md: 'none' }, p: 1 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Autocomplete
            sx={{ width: 300 }}
            options={top100Films}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component='li'
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {/* <img
                  loading='lazy'
                  width='20'
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=''
                /> */}
                {option.label} {option.year}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  <Box sx={{ display: 'flex' }}>
                    <Search color='primary' />{' '}
                    <Box sx={{ color: blue[700] }}>пошук</Box>
                  </Box>
                }
                size='small'
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
              />
            )}
          />
          <Button
            startIcon={<LocalFlorist />}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            Догляд
          </Button>
          <Button
            startIcon={<Yard />}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            Як замовити
          </Button>
        </Box>
      </AppBar>
      <BasketWindow open={basket} handleClose={handleCloseBasket} />
    </Box>
  );
});

export default NavBarMiddle;
