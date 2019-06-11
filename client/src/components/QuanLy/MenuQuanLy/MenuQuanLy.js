import React, { Component } from 'react';
import {Navbar, NavbarBrand, NavItem, Nav, NavLink } from 'reactstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class MenuQuanLy extends Component {
    constructor (props) {
        super(props);
        this.state = {
            daDangXuat: false
        }
    }

    dangXuat = () => {
      this.setState({daDangXuat: true})
      axios.post('http://localhost:8797/quan-ly-dang-xuat')
         .then(res => {
               if(res.logout === "thành công") {
                  localStorage.clear()                    
               }
         })
         .catch(err => {
               alert(err)
         })
    }
    
    render() {
        if(this.state.daDangXuat === true) {
            localStorage.clear();
            return <Redirect to = '/' />
        }
        return (
            
            <div>
                <Navbar color = "light" light expand="md">
                    <NavbarBrand href="/quan-ly">
                        Trang quản lý
                    </NavbarBrand>
                    <Nav navbar>
                        <NavItem >
                            <NavLink>Xin chào {JSON.parse(localStorage.getItem('quanly')).hoten}</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" onClick={() => this.dangXuat()}>Đăng xuất</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default MenuQuanLy;