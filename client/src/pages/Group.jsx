import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import Buttons from '../components/helpers/Buttons';
import { getFlowers } from '../http/flowerAPI';
import { getImages } from '../http/imageAPI';
import Flowers from '../components/Flowers';
import { getGroup } from '../http/groupAPI';

const Group = observer(() => {
  const { store } = useContext(Context);

  // console.log(store.selectedGroup && store.selectedGroup.label);

  useEffect(() => {
    getGroup(localStorage.getItem('groupId')).then((data) =>
      store.setSelectedGroup(data)
    );
  }, [store]);
  useEffect(() => {
    getFlowers(localStorage.getItem('groupId')).then((data) =>
      store.setFlowers(data)
    );
  }, [store, store.selectedGroup]);
  useEffect(() => {
    getImages(localStorage.getItem('groupId')).then((data) =>
      store.setImages(data)
    );
  }, [store, store.selectedGroup]);
  useEffect(() => {
    store.setBasket(JSON.parse(localStorage.getItem('basket')));
  }, [store]);

  return (
    <>
      <Buttons
        items={[{ label: 'Головна', nav: '' }]}
        endItem={store.selectedGroup && store.selectedGroup.label}
      />
      <Flowers />
    </>
  );
});

export default Group;
