import React from 'react';
import { Stack, Button, IconButton } from '@mui/material';
import { Close, Delete } from '@mui/icons-material';

const DeleteButton = ({ show, onHide, value, removeItem }) => {
  return (
    <>
      {show && (
        <>
          <hr />
          <Stack
            spacing={1}
            sx={{
              border: '1px solid darkgray',
              borderRadius: 1.5,
              p: 1,
            }}
          >
            <IconButton
              size='small'
              sx={{ alignSelf: 'end', fontSize: 14 }}
              onClick={onHide}
            >
              {/* Закрити */}
              <Close fontSize='small' />
            </IconButton>
            <Button
              variant='contained'
              endIcon={<Delete />}
              color='error'
              onClick={removeItem}
            >
              Видадити {value}
            </Button>
          </Stack>
        </>
      )}
    </>
  );
};

export default DeleteButton;
