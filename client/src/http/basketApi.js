import { $authHost, $host } from '.';

export const createBasket = async (basket) => {
  try {
    const { data } = await $authHost.post('api/basket', basket);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const getBaskets = async (userId) => {
  try {
    const { data } = await $host.get('api/basket');
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const getBasket = async (id) => {
  try {
    const { data } = await $host.get('api/basket/' + id);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
// export const editGallery = async (id, gallery) => {
//   try {
//     const { data } = await $authHost.put('api/gallery/' + id, gallery);
//     return data;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

export const removeBasket = async (id) => {
  try {
    const { data } = await $authHost.delete('api/basket/' + id);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
