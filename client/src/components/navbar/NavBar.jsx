import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBarBottom from './NavBarBottom';
import NavBarTop from './NavBarTop';
import NavBarMiddle from './NavBarMiddle';

const NavBar = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/make_order' && (
        <>
          <NavBarTop />
          <NavBarMiddle />
          <NavBarBottom />
        </>
      )}
    </>
  );
};

export default NavBar;
