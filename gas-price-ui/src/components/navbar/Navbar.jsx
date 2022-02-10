import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu
} from './NavbarElements';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to='/'>
            Map
          </NavLink>
          <NavLink to='/statistics'>
            Statistics
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;