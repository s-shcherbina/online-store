import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { Stack, Box, Tab, Grid, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import EditGroup from '../components/edit/EditGroup';
import EditSubGroup from '../components/edit/EditSubGroup';
import EditGood from '../components/edit/EditGood';
import { getGroups } from '../http/groupAPI';
import { getSubGroups } from '../http/subGroupAPI';
import { getFlowers } from '../http/flowerAPI';
import { getImages } from '../http/imageAPI';
import Images from '../components/edit/Images';
import FlowerView from '../components/FlowerView';

const Admin = observer(() => {
  const { store } = useContext(Context);
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // console.log(store.selectedGroup && store.selectedGroup.id);
  // console.log(store.selectedSubGroup && store.selectedSubGroup.id);
  // console.log(store.selectedFlower && store.selectedFlower.id);
  // console.log(store.selectedImage && store.selectedImage.img);
  // console.log(store.selectedImage && store.images.length);ˆ

  useEffect(() => {
    getGroups()
      .then((data) => store.setGroups(data))
      .then(() =>
        store.setSelectedGroup(
          !!(store.groups && store.groups.length) ? store.groups[0] : null
        )
      );
  }, [store]);
  useEffect(() => {
    getSubGroups(store.selectedGroup ? store.selectedGroup.id : 0)
      .then((data) => store.setSubGroups(data))
      .then(() =>
        store.setSelectedSubGroup(
          !!(store.subGroups && store.subGroups.length)
            ? store.subGroups[0]
            : null
        )
      );
  }, [store, store.selectedGroup]);
  useEffect(() => {
    getFlowers(
      store.selectedGroup ? store.selectedGroup.id : 0,
      store.selectedSubGroup ? store.selectedSubGroup.id : 0
    )
      .then((data) => store.setFlowers(data))
      .then(() =>
        store.setSelectedFlower(
          !!(store.flowers && store.flowers.length) ? store.flowers[0] : null
        )
      );
  }, [store, store.selectedSubGroup, store.selectedGroup]);
  useEffect(() => {
    getImages(
      store.selectedGroup ? store.selectedGroup.id : 0,
      store.selectedSubGroup ? store.selectedSubGroup.id : 0,
      store.selectedFlower ? store.selectedFlower.id : 0
    )
      .then((data) => store.setImages(data))
      .then(() =>
        store.setSelectedImage(
          !!(store.images && store.images.length) ? store.images[0] : null
        )
      );
  }, [
    store,
    store.selectedFlower,
    store.selectedSubGroup,
    store.selectedGroup,
  ]);

  return (
    <Stack
      alignItems='center'
      sx={{
        mt: 1.5,
        typography: 'body1',
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{ maxWidth: { xs: 300, sm: 600 }, bgcolor: 'background.paper' }}
        >
          <TabList onChange={handleChange} variant='scrollable' scrollButtons>
            <Tab label='Товари' value='1' />
            <Tab label='Замовлення' value='2' />
            <Tab label='Галереї' value='3' />
            <Tab label='Користувачи' value='4' />
          </TabList>
        </Box>

        <TabPanel
          value='1'
          sx={{
            overflow: 'auto',
            width: '100%',
          }}
        >
          <FlowerView admin={true} />
          <Box sx={{ mt: 2 }}></Box>
          <Grid container spacing={{ xs: 1, md: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <EditGroup />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <EditSubGroup />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <EditGood />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Images />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value='2' sx={{ overflow: 'auto' }}>
          {/* <EditGood /> */}
        </TabPanel>

        <TabPanel value='3' sx={{ overflow: 'auto' }}>
          {/* <EditCoupon /> */}
        </TabPanel>

        <TabPanel value='4'>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, md: 2 }}
          >
            <Stack
              sx={{
                border: '2px solid darkgray',
                borderRadius: 2,
                width: { xs: '90vw', sm: '65vw' },
              }}
            >
              <Typography variant='h6' color='primary' sx={{ m: '2% auto' }}>
                CUSTOMERS
              </Typography>
            </Stack>
            <Stack
              sx={{
                border: '2px solid darkgray',
                borderRadius: 2,
                width: { xs: '90vw', sm: '30vw' },
              }}
            >
              <Typography variant='h6' color='primary' sx={{ m: '2% auto' }}>
                ADMINS
              </Typography>
            </Stack>
          </Stack>
        </TabPanel>
      </TabContext>
    </Stack>
  );
});

export default Admin;
