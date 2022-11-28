import { $authHost, $host } from '.';

export const createFlower = async (flower) => {
  try {
    const { data } = await $authHost.post('api/flower', flower);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const editFlower = async (id, flower) => {
  try {
    const { data } = await $authHost.put('api/flower/' + id, flower);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const getFlowers = async (groupId, subGroupId) => {
  try {
    const { data } = await $host.get('api/flower', {
      params: { groupId, subGroupId },
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const getFlower = async (id) => {
  try {
    const { data } = await $host.get('api/flower/' + id);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const removeFlower = async (id) => {
  try {
    const { data } = await $authHost.delete('api/flower/' + id);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
