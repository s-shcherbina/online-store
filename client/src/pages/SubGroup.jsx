import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import Buttons from '../components/helpers/Buttons';
import { getFlowers } from '../http/flowerAPI';
import { getImages } from '../http/imageAPI';
import Flowers from '../components/Flowers';
// import { useLocation } from 'react-router-dom';
import { getSubGroup } from '../http/subGroupAPI';
import { getGroup } from '../http/groupAPI';

const SubGroup = observer(() => {
  const { store } = useContext(Context);
  // const location = useLocation();
  // console.log(location.pathname)

  useEffect(() => {
    getGroup(localStorage.getItem('groupId')).then((data) =>
      store.setSelectedGroup(data)
    );
  }, [store]);
  useEffect(() => {
    getSubGroup(localStorage.getItem('subGroupId')).then((data) =>
      store.setSelectedSubGroup(data)
    );
  }, [store]);
  useEffect(() => {
    getFlowers(
      localStorage.getItem('groupId'),
      localStorage.getItem('subGroupId')
    ).then((data) => store.setFlowers(data));
  }, [store, store.selectedGroup, store.selectedSubGroup]);
  useEffect(() => {
    getImages(
      localStorage.getItem('groupId'),
      localStorage.getItem('subGroupId')
    ).then((data) => store.setImages(data));
  }, [store, store.selectedGroup, store.selectedSubGroup]);
  useEffect(() => {
    store.setBasket(JSON.parse(localStorage.getItem('basket')));
  }, [store]);

  return (
    <>
      <Buttons
        items={[
          { label: 'Головна', nav: '' },
          {
            label: store.selectedGroup && store.selectedGroup.label,
            nav: 'group',
          },
        ]}
        endItem={store.selectedSubGroup && store.selectedSubGroup.label}
      />
      <Flowers />
    </>
  );
});

export default SubGroup;
