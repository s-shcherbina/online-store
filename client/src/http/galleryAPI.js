import { $authHost, $host } from '.';

export const createGallery = async (gallery) => {
  try {
    const { data } = await $authHost.post('api/gallery', gallery);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const getGalleries = async () => {
  try {
    const { data } = await $host.get('api/gallery');
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const editGallery = async (id, gallery) => {
  try {
    const { data } = await $authHost.put('api/gallery/' + id, gallery);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const getGallery = async (id) => {
  try {
    const { data } = await $host.get('api/gallery/' + id);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const removeGallery = async (id) => {
  try {
    const { data } = await $authHost.delete('api/gallery/' + id);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
