import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from '../pages/Admin';
import Main from '../pages/Main';
import Group from '../pages/Group';
import Flower from '../pages/Flower';
import Gallery from '../pages/Gallery';
import Contacts from '../pages/Contacts';
import Care from '../pages/Care';
import Order from '../pages/Order';
import Auth from '../pages/Auth';
import SubGroup from '../pages/SubGroup';
import MakeOrder from '../pages/MakeOrder';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/group' element={<Group />} />
      <Route path='/sub_group' element={<SubGroup />} />
      <Route path='/make_order' element={<MakeOrder />} />
      <Route path='/gallery' element={<Gallery />} />
      <Route path='/contacts' element={<Contacts />} />
      <Route path='/care' element={<Care />} />
      <Route path='/order' element={<Order />} />
      <Route path='/flower' element={<Flower />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='*' element={<Main />} />
    </Routes>
  );
};

export default AppRouter;
