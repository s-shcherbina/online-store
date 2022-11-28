import React, { useContext, useState } from 'react';
import { Stack, Button, CardMedia } from '@mui/material';
import { AddAPhoto, NoPhotography, PhotoCamera } from '@mui/icons-material';
import { Context } from '../..';
import { baseURL } from '../../http';
import { createImage, getImages, removeImage } from '../../http/imageAPI';
import { observer } from 'mobx-react-lite';

const Images = observer(() => {
  const { store } = useContext(Context);
  const [file, setFile] = useState(null);

  // console.log(store.selectedImage && store.selectedImage.img);

  return (
    <Stack
      spacing={1}
      sx={{
        border: '2px solid darkgray',
        borderRadius: 2,
        p: 1.5,
      }}
    >
      {/* {!!store.images.length && ( */}
      {store.selectedImage && (
        <CardMedia
          image={
            process.env.NODE_ENV === 'production'
              ? store.selectedImage &&
                baseURL + 'api/' + store.selectedImage.img
              : store.selectedImage && baseURL + store.selectedImage.img
          }
          src={store.selectedImage && baseURL + store.selectedImage.img}
          // alt={store.selectedFlower && store.selectedFlower.label}
          // title={store.selectedFlower && store.selectedFlower.label}
          sx={{ height: 102, borderRadius: 1, width: 180, m: '0 auto' }}
        />
      )}
      <Button
        disabled={!store.selectedFlower}
        variant='outlined'
        endIcon={<PhotoCamera />}
        component='label'
      >
        Завантажити
        <input
          hidden
          accept='image/*'
          // multiple
          type='file'
          onChange={(e) => setFile(e.target.files[0])}
        />
      </Button>
      <hr />
      <Button
        disabled={!store.selectedFlower}
        variant='outlined'
        endIcon={<AddAPhoto />}
        onClick={() => {
          const formData = new FormData();
          formData.append('flowerId', store.selectedFlower.id);
          formData.append('subGroupId', store.selectedSubGroup.id);
          formData.append('groupId', store.selectedGroup.id);
          formData.append('img', file);
          createImage(formData)
            .then((data) => store.setSelectedImage(data))
            .then(() =>
              getImages(
                store.selectedFlower ? store.selectedFlower.id : 0,
                store.selectedSubGroup ? store.selectedSubGroup.id : 0,
                store.selectedGroup ? store.selectedGroup.id : 0
              )
            )
            .then((data) => store.setImages(data));
        }}
      >
        Додати
      </Button>
      <hr />
      <Button
        // disabled={!store.images.length}
        disabled={!store.selectedImage}
        variant='outlined'
        endIcon={<NoPhotography />}
        color='error'
        onClick={() =>
          removeImage(store.selectedImage && store.selectedImage.id)
            .then(() =>
              getImages(
                store.selectedFlower ? store.selectedFlower.id : 0,
                store.selectedSubGroup ? store.selectedSubGroup.id : 0,
                store.selectedGroup ? store.selectedGroup.id : 0
              )
            )
            .then((data) => store.setImages(data))
            .then(() =>
              store.setSelectedImage(store.images ? store.images[0] : null)
            )
        }
      >
        Видалити
      </Button>
    </Stack>
  );
});

export default Images;
