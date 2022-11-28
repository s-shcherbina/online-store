import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import Buttons from '../components/helpers/Buttons';
import { getImages } from '../http/imageAPI';
import { getFlower } from '../http/flowerAPI';
import { getSubGroup } from '../http/subGroupAPI';
import { getGroup } from '../http/groupAPI';
import ImagesItem from '../components/ImagesItem';
import BasketWindow from '../components/BasketWindow';
import FlowerView from '../components/FlowerView';
import { useNavigate } from 'react-router-dom';
export const storage = (basket) =>
  localStorage.setItem(
    'basket',
    JSON.stringify([
      ...basket.map((item) => {
        return {
          id: item.id,
          label: item.label,
          price: item.price,
          img: item.img,
          number: item.number,
        };
      }),
    ])
  );
export const basketFlower = (item, image) => {
  return {
    id: item.id,
    label: item.label,
    price: item.price,
    img: image.img,
    number: 1,
  };
};

const Flower = observer(() => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [img, setImg] = useState(false);
  const [basket, setBasket] = useState(false);
  const handleOpenImg = () => setImg(true);
  const handleCloseImg = () => setImg(false);
  const handleOpenBasket = () => setBasket(true);
  const handleCloseBasket = () => {
    storage(store.basket);
    setBasket(false);
    navigate('/group');
  };

  useEffect(() => {
    getFlower(localStorage.getItem('flowerId')).then((data) =>
      store.setSelectedFlower(data)
    );
  }, [store]);
  useEffect(() => {
    getSubGroup(localStorage.getItem('subGroupId')).then((data) =>
      store.setSelectedSubGroup(data)
    );
  }, [store]);
  useEffect(() => {
    getGroup(localStorage.getItem('groupId')).then((data) =>
      store.setSelectedGroup(data)
    );
  }, [store]);
  useEffect(() => {
    getImages(
      localStorage.getItem('groupId'),
      localStorage.getItem('subGroupId'),
      localStorage.getItem('flowerId')
    )
      .then((data) => store.setImages(data))
      .then(() => store.setSelectedImage(store.images && store.images[0]));
  }, [
    store,
    store.selectedGroup,
    store.selectedSubGroup,
    store.selectedFlower,
  ]);
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
          {
            label: store.selectedSubGroup && store.selectedSubGroup.label,
            nav: 'sub_group',
          },
        ]}
        endItem={store.selectedFlower && store.selectedFlower.label}
      />
      <FlowerView
        handleOpenImg={handleOpenImg}
        handleOpenBasket={handleOpenBasket}
      />
      <ImagesItem open={img} handleClose={handleCloseImg} />
      <BasketWindow open={basket} handleClose={handleCloseBasket} />
    </>
  );
});

export default Flower;
