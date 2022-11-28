import { $host, $authHost } from '.';

export const createImage = async (image) => {
  try {
    const { data } = await $authHost.post('api/image', image);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const getImage = async (id) => {
  try {
    const { data } = await $host.get('api/image/' + id);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getImages = async (groupId, subGroupId, flowerId) => {
  try {
    const { data } = await $host.get('api/image', {
      params: { groupId, subGroupId, flowerId },
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const removeImage = async (id) => {
  try {
    const { data } = await $authHost.delete('api/image/' + id);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
