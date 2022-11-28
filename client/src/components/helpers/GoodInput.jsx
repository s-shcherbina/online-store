import React from 'react';
import {
  Stack,
  Button,
  TextField,
  IconButton,
  TextareaAutosize,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const GoodInput = ({
  show,
  onHide,
  label,
  price,
  text,
  buttonLabel,
  endIcon,
  changeLabel,
  changePrice,
  changeText,
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
              label='найменування'
              variant='outlined'
              value={label}
              onChange={changeLabel}
            />
            <TextField
              size='small'
              label='ціна'
              variant='outlined'
              value={price}
              onChange={changePrice}
            />
            <TextareaAutosize
              aria-label='minimum height'
              minRows={3}
              placeholder='Опис товару'
              style={{ width: '100%' }}
              value={text}
              onChange={changeText}
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

export default GoodInput;
