import React from 'react';
import { Stack, Button, TextField, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const Input = ({
  show,
  onHide,
  placeholder,
  label,
  buttonLabel,
  endIcon,
  changeLabel,
  changeItem,
}) => {
  return (
    <>
      {show && (
        <>
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
              <Close fontSize='small' />
            </IconButton>
            <TextField
              size='small'
              label={placeholder}
              variant='outlined'
              value={label}
              onChange={changeLabel}
            />
            <Button variant='outlined' endIcon={endIcon} onClick={changeItem}>
              {buttonLabel}
            </Button>
          </Stack>
          <hr />
        </>
      )}
    </>
  );
};

export default Input;
