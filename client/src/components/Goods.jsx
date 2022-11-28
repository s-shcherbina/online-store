import React, { useContext } from 'react';
import {
  IconButton,
  Stack,
  CardMedia,
  Typography,
  Divider,
  Paper,
} from '@mui/material';
import { baseURL } from '../http';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { Delete } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import NumberInput from './helpers/NumberInput';

const Goods = observer(({ handleClose }) => {
  const { store } = useContext(Context);
  return (
    <Stack spacing={{ xs: 0.5, sm: 1 }}>
      {store.basket &&
        store.basket.map((item) => (
          <Paper key={item.img}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              justifyContent='space-between'
              sx={{
                border: `1px solid ${grey[300]}`,
                borderRadius: 1.5,
                p: { xs: 0.5, lg: 1.5 },
              }}
            >
              <Stack
                direction='row'
                spacing={{ xs: 1, sm: 2 }}
                alignItems='center'
              >
                <CardMedia
                  image={baseURL + item.img}
                  src={baseURL + item.img}
                  sx={{
                    height: 100,
                    borderRadius: 1,
                    width: 130,
                  }}
                />
                <Stack>
                  <Typography
                    variant='subtitle1'
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    {item.label && item.label.slice(0, item.label.indexOf('('))}
                    <br />
                    {item.label && item.label.slice(item.label.indexOf('('))}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    sx={{
                      textAlign: 'center',
                      display: { xs: 'none', md: 'block' },
                    }}
                  >
                    {item.price} грн
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                sx={{ minWidth: '40%' }}
              >
                <NumberInput item={item} />
                <Typography variant='subtitle1' sx={{ fontWeight: 500, ml: 2 }}>
                  {item.price * item.number} грн
                </Typography>
                <IconButton
                  color='error'
                  sx={{ borderBottom: `1px solid red` }}
                  onClick={() => {
                    store.setBasket(
                      store.basket.filter(
                        (basketItem) => basketItem.id !== item.id
                      )
                    );
                    !store.basket.length && handleClose();
                  }}
                >
                  <Delete fontSize='small' />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>
        ))}
      <Divider />
      <Typography variant='h6' sx={{ alignSelf: 'flex-end' }}>
        Разом:{' '}
        {store.basket &&
          [...store.basket].reduce(
            (sum, item) => sum + item.price * item.number,
            0
          )}{' '}
        грн
      </Typography>
    </Stack>
  );
});

export default Goods;
