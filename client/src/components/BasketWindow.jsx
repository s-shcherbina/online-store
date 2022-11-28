import React, { useContext } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  DialogActions,
  DialogTitle,
  Button,
} from '@mui/material';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { ArrowBack, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { storage } from '../pages/Flower';
import Goods from './Goods';

const BasketWindow = observer(({ open, handleClose }) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  return (
    <Dialog fullWidth={true} maxWidth='md' open={open} onClose={handleClose}>
      <IconButton onClick={handleClose} sx={{ mb: -6, ml: 'auto' }}>
        <Close />
      </IconButton>
      <DialogTitle sx={{ fontSize: { xs: 20, sm: 28 }, mb: -2 }}>
        Кошик
      </DialogTitle>
      <DialogContent>
        <Goods handleClose={handleClose} />
      </DialogContent>
      <DialogActions
        sx={{
          p: { xs: '', sm: 3 },
          mt: -2,
          display: { xs: 'inline-block', sm: 'flex' },
        }}
      >
        <Button
          sx={{ mr: 'auto' }}
          startIcon={<ArrowBack />}
          onClick={() => {
            storage(store.basket);
            handleClose();
            navigate('/group');
          }}
        >
          Повернутись до покупок
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            storage(store.basket);
            handleClose();
            navigate('/make_order');
          }}
        >
          Оформити замовлення
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default BasketWindow;
