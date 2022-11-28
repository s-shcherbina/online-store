import { $authHost, $host } from '.';

export const createSubGroup = async (subGroup) => {
  try {
    const { data } = await $authHost.post('api/sub_group', subGroup);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const getSubGroups = async (groupId) => {
  try {
    const { data } = await $host.get('api/sub_group', { params: { groupId } });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const editSubGroup = async (id, subGroup) => {
  try {
    const { data } = await $authHost.put('api/sub_group/' + id, subGroup);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const getSubGroup = async (id) => {
  try {
    const { data } = await $host.get('api/sub_group/' + id);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const removeSubGroup = async (id) => {
  try {
    const { data } = await $authHost.delete('api/sub_group/' + id);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
