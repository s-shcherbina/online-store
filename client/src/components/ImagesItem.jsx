import React, { useContext, useState } from 'react';
import {
  Typography,
  CardMedia,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  DialogActions,
} from '@mui/material';
import { baseURL } from '../http';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import {
  Close,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import { Box } from '@mui/system';

const ImagesItem = observer(({ open, handleClose }) => {
  const { store } = useContext(Context);
  const [counter, setCounter] = useState(1);

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <DialogActions>
        <Box sx={{ width: '95%', display: 'flex', justifyContent: 'center' }}>
          <IconButton
            disabled={counter <= 1}
            sx={{ mt: -0.7 }}
            onClick={() => {
              setCounter((counter) => counter - 1);
              store.setSelectedImage(store.images[counter - 2]);
            }}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <Typography variant='subtitle1'>
            {`${store.selectedFlower.label}`}
            {/* - ${store.images && store.images.length} фото` */}
          </Typography>
          <IconButton
            disabled={store.images && store.images.length < counter + 1}
            sx={{ mt: -0.7 }}
            onClick={() => {
              setCounter((counter) => counter + 1);
              store.setSelectedImage(store.images[counter]);
            }}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Box>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogActions>
      <DialogContent sx={{ mt: -3 }}>
        <Grid container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12} md={9}>
            <CardMedia
              image={store.selectedImage && baseURL + store.selectedImage.img}
              src={store.selectedImage && baseURL + store.selectedImage.img}
              sx={{
                height: { xs: 300, sm: 500, md: 750 },
                borderRadius: 2,
                cursor: 'zoom-out',
              }}
              onClick={handleClose}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} sx={{ overflow: 'auto' }}>
            <Grid
              container
              spacing={{ xs: 0.5, sm: 1 }}
              sx={{ overflow: 'auto' }}
            >
              {store.images &&
                store.images.map((image) => (
                  <Grid item xs={4} sm={3} md={6} key={image.img}>
                    <CardMedia
                      image={baseURL + image.img}
                      src={baseURL + image.img}
                      sx={{
                        height: { xs: 80, sm: 115 },
                        borderRadius: 1,
                        cursor: 'pointer',
                        border:
                          store.selectedImage.id === image.id
                            ? 'solid red'
                            : 'solid white',
                      }}
                      onClick={() => store.setSelectedImage(image)}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
});

export default ImagesItem;
