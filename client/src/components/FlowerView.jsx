import React, { useContext } from 'react';
import {
  Button,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Card,
} from '@mui/material';
import { baseURL } from '../http';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { basketFlower } from '../pages/Flower';

const FlowerView = observer(({ handleOpenImg, handleOpenBasket, admin }) => {
  const { store } = useContext(Context);

  // localStorage.removeItem('basket');
  // console.log(localStorage.getItem('basket'));

  return (
    <div>
      <Card sx={{ p: 1.5, mt: -1 }}>
        <Grid container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12} md={6}>
            <CardMedia
              image={store.selectedImage && baseURL + store.selectedImage.img}
              src={store.selectedImage && baseURL + store.selectedImage.img}
              alt={store.selectedFlower && store.selectedFlower.label}
              sx={{
                height: { xs: 250, sm: 500 },
                borderRadius: 1.5,
                mb: 1,
                cursor: 'zoom-in',
              }}
              onClick={admin ? () => () => {} : handleOpenImg}
            />
            <Grid container spacing={1}>
              {store.images &&
                store.images.map((image) => (
                  <Grid item xs={4} sm={3} lg={2} key={image.img}>
                    <CardMedia
                      image={baseURL + image.img}
                      src={baseURL + image.img}
                      // alt={store.selectedFlower && store.selectedFlower.label}
                      sx={{
                        height: { xs: 70, sm: 90 },
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
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography
                variant='h4'
                color='primary'
                sx={{
                  textAlign: 'left',
                }}
              >
                {store.selectedFlower && store.selectedFlower.label && (
                  <>
                    {store.selectedFlower.label.slice(
                      0,
                      store.selectedFlower.label.indexOf('(')
                    )}
                    <br />
                    {store.selectedFlower.label.slice(
                      store.selectedFlower.label.indexOf('(')
                    )}
                    <br />
                    {store.selectedFlower.price} грн
                  </>
                )}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                disabled={admin}
                size='large'
                variant='contained'
                sx={{ ml: 1 }}
                onClick={() => {
                  store.basket === null
                    ? store.setBasket([
                        basketFlower(store.selectedFlower, store.selectedImage),
                      ])
                    : store.basket.every(
                        (item) => item.id !== store.selectedFlower.id
                      ) &&
                      store.setBasket([
                        ...store.basket,
                        basketFlower(store.selectedFlower, store.selectedImage),
                      ]);
                  handleOpenBasket();
                }}
              >
                {store.basket &&
                store.basket.find((item) => item.id === store.selectedFlower.id)
                  ? 'В кошику'
                  : 'Купити'}
                {/* Купити */}
              </Button>
            </CardActions>
            <Typography
              variant='body1'
              sx={{ mt: 2, fontSize: { xs: 16, md: 20 } }}
            >
              {store.selectedFlower && store.selectedFlower.text}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
});

export default FlowerView;
