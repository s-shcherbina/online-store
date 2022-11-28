import { $authHost, $host } from '.';

export const createGroup = async (group) => {
  try {
    const { data } = await $authHost.post('api/group', group);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const getGroups = async () => {
  try {
    const { data } = await $host.get('api/group');
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const editGroup = async (id, group) => {
  try {
    const { data } = await $authHost.put('api/group/' + id, group);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const getGroup = async (id) => {
  try {
    const { data } = await $host.get('api/group/' + id);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const removeGroup = async (id) => {
  try {
    const { data } = await $authHost.delete('api/group/' + id);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
