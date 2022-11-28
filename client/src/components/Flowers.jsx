import React, { useContext, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  CardActions,
  Button,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { baseURL } from '../http';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';
import BasketWindow from './BasketWindow';
import { basketFlower, storage } from '../pages/Flower';

const Flowers = observer(() => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [basket, setBasket] = useState(false);
  const handleCloseBasket = () => {
    storage(store.basket);
    setBasket(false);
    navigate('/group');
  };

  const selectImgs = (item) =>
    store.images && store.images.filter((imgs) => imgs.flowerId === item.id);

  return (
    <Grid container spacing={{ xs: 1, md: 3 }}>
      {store.flowers &&
        store.flowers.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                borderRadius: 1,
                p: 1,
                height: '92%',
              }}
              onMouseOver={() => {
                store.setSelectedFlower(item);
                localStorage.setItem('flowerId', item.id);
                localStorage.setItem('subGroupId', item.subGroupId);
                setVisible(true);
              }}
              onMouseOut={() => setVisible(false)}
            >
              <Carousel>
                {store.images &&
                  selectImgs(item).map((image) => (
                    <CardMedia
                      key={image.id}
                      image={baseURL + image.img}
                      sx={{
                        height: { xs: 240 },
                        borderRadius: 1,
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        store.setSelectedImage(image);
                        navigate('/flower');
                      }}
                    />
                  ))}
              </Carousel>
              <CardContent>
                <Typography variant='h6' color='primary'>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mt: -1.5,
                    }}
                  >
                    {item.label.slice(0, item.label.indexOf('('))}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mt: -0.7,
                    }}
                  >
                    {item.label.slice(item.label.indexOf('('))}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mt: -0.7,
                    }}
                  >
                    {item.price} грн
                  </Box>
                </Typography>
              </CardContent>
              {visible && store.selectedFlower.id === item.id && (
                <CardActions sx={{ p: 1 }}>
                  <Button
                    sx={{ mb: 2, mr: 'auto', mt: -2 }}
                    onClick={() => {
                      store.setSelectedImage(selectImgs(item)[0]);
                      navigate('/flower');
                    }}
                  >
                    Детальніше...
                  </Button>
                  <Button
                    variant='contained'
                    sx={{ mb: 2, ml: 'auto', mt: -2 }}
                    onClick={() => {
                      store.setSelectedImage(selectImgs(item)[0]);
                      store.basket === null
                        ? store.setBasket([
                            basketFlower(
                              store.selectedFlower,
                              store.selectedImage
                            ),
                          ])
                        : store.basket.every(
                            (item) => item.id !== store.selectedFlower.id
                          ) &&
                          store.setBasket([
                            ...store.basket,
                            basketFlower(
                              store.selectedFlower,
                              store.selectedImage
                            ),
                          ]);
                      setBasket(true);
                    }}
                  >
                    {store.basket &&
                    store.basket.find(
                      (item) => item.id === store.selectedFlower.id
                    )
                      ? 'В кошику'
                      : 'Купити'}
                    {/* Купити */}
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      <BasketWindow open={basket} handleClose={handleCloseBasket} />
    </Grid>
  );
});

export default Flowers;
