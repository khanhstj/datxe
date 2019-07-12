import React, { Component } from 'react';
import {Navbar, NavbarBrand, NavItem, Nav, NavLink, Button } from 'reactstrap';
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class MenuBacTai extends Component {
   
   constructor (props) {
      super(props);
      this.state = {
         daDangXuat: false,
         chayXe: false
      }
	}	

   dangXuat = () => {
      this.setState({daDangXuat: true})
      axios.post('http://localhost:8797/bac-tai-dang-xuat') 
         .then(res => {
            if(res.logout === "thành công") {               
               localStorage.clear()

            }

         })
         .catch(err => {
               alert(err)
         })
   }
   
   ChayXe_TamDung = (hanhDong) => {
      this.props.ChayXe_TamDung(hanhDong)
      if(hanhDong === 'chayxe') {
         this.setState({chayXe: true})
      }
      else if (hanhDong === 'tamdung') {
         this.setState({chayXe: false})
      }
   }

   render() 
   {
		if(this.state.daDangXuat === true) {
			localStorage.clear();
			return <Redirect to = '/' />
		}
      
      return (         
         <div>
               <Navbar color = "light" light expand="md">
                  <NavbarBrand href="/bac-tai">
                     Trang bác tài
                  </NavbarBrand>
                  <Nav navbar>
                     
                     <NavItem >
                           <NavLink>Xin chào {JSON.parse(localStorage.getItem('bactai')).hoten}</NavLink>
                     </NavItem>
                     <NavItem>
                           <NavLink href="#" onClick={() => this.dangXuat()}>Đăng xuất</NavLink>
                     </NavItem>
                  </Nav>
                  <Nav className='ml-auto'>
                     { this.props.chayXe === false
                     ? <Button onClick={() => this.ChayXe_TamDung('chayxe')} >Chạy xe</Button>
                     : <Button onClick={() => this.ChayXe_TamDung('tamdung')} >Tạm dừng</Button>
                     }
                  </Nav>
                  
                  
                  
               </Navbar>
         </div>
      );
   }
}

export default MenuBacTai;