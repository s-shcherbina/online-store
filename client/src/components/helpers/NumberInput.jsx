import React, { useContext } from 'react';
import { IconButton, Stack, TextField, Paper } from '@mui/material';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { Add, Remove } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

const NumberInput = observer(({ item }) => {
  const { store } = useContext(Context);
  return (
    <Paper>
      <Stack
        direction='row'
        spacing={{ xs: 0.1, sm: 0.5, md: 1 }}
        alignItems='center'
        sx={{
          border: `1px solid ${grey[500]}`,
          borderRadius: 1,
        }}
      >
        <IconButton
          disabled={item.number <= 1}
          sx={{ borderBottom: `1px solid ${grey[500]}` }}
          onClick={() =>
            store.setBasket(
              store.basket.map((basketItem) =>
                basketItem.id === item.id
                  ? {
                      ...basketItem,
                      number: basketItem.number - 1,
                    }
                  : basketItem
              )
            )
          }
        >
          <Remove fontSize='small' />
        </IconButton>

        <TextField
          value={item.number}
          size='small'
          variant='standard'
          sx={{
            fontWeight: 'bold',
            pt: 0.7,
            width: item.number > 9 ? 18 : 10,
            borderBottom: `1px solid ${grey[500]}`,
          }}
          onChange={(e) =>
            store.setBasket(
              store.basket.map((basketItem) =>
                basketItem.id === item.id
                  ? {
                      ...basketItem,
                      number: Number(
                        e.target.value <= 20
                          ? e.target.value
                          : (e.target.value = 20)
                      ),
                    }
                  : basketItem
              )
            )
          }
        />
        <IconButton
          disabled={item.number >= 20}
          sx={{ borderBottom: `1px solid ${grey[500]}` }}
          onClick={() =>
            store.setBasket([
              ...store.basket.map((basketItem) =>
                basketItem.id === item.id
                  ? {
                      ...basketItem,
                      number: basketItem.number + 1,
                    }
                  : basketItem
              ),
            ])
          }
        >
          <Add fontSize='small' />
        </IconButton>
      </Stack>
    </Paper>
  );
});
export default NumberInput;
