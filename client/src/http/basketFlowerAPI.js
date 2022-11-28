import { $authHost, $host } from '.';

export const createBasketFlower = async (basket) => {
  try {
    const { data } = await $authHost.post('api/basket_flower', basket);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const getBasketflowers = async () => {
  try {
    const { data } = await $host.get('api/basket_flower');
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
