import React, { Component } from 'react';
import {Navbar, NavbarBrand, NavItem, Nav, NavLink,  } from 'reactstrap';

class MenuDatXe extends Component {
   render() {
      return (
         <div>
            <Navbar color = "light" light expand="md">
               <NavbarBrand href="/dat-xe">
                  Trang đặt xe
               </NavbarBrand>
               <Nav navbar>
                  
                  <NavItem >
                        <NavLink>Xin chào quý khách</NavLink>
                  </NavItem>
                  <NavItem>
                        <NavLink href="/" >Thoát ra</NavLink>
                  </NavItem>
               </Nav>
            </Navbar>
            
         </div>
      );
   }
}

export default MenuDatXe;