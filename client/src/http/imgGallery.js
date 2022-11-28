import { $host, $authHost } from '.';

export const createImgGallery = async (image) => {
  try {
    const { data } = await $authHost.post('api/img_gallery', image);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const getImgGallery = async (id) => {
  try {
    const { data } = await $host.get('api/img_gallery/' + id);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getImgGalleries = async (galleryId) => {
  try {
    const { data } = await $host.get('api/image', {
      params: { galleryId },
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const removeImgGallery = async (id) => {
  try {
    const { data } = await $authHost.delete('api/image/' + id);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
