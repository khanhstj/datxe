import React, { Component } from 'react';
import {Navbar, NavbarBrand, NavItem, Nav, NavLink, Button } from 'reactstrap';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from '../../../actions/index'

class MenuDatXe extends Component {
   constructor(props) {
      super(props)
      this.state={
         dangXuat : false,
         chiDuong: true
      }
   }

   thoatRa = () => {
      localStorage.clear()
      this.setState({
         dangXuat: true,
         
      })
   }

   hienChiDuong = () => {
      /*this.props.hienChiDuong(this.state.chiDuong)
      this.setState(prevState => ({
         chiDuong: !prevState.chiDuong
      }))
      */
     console.log(this.props.stj)
     this.props.counterIncrease()
   }

   render() {
      //var {stj} = this.props
      //console.log(stj)
      if(this.state.dangXuat === true) {
         return <Redirect to="/" />
      }
      else {
         return (
            <div>
               <Navbar color = "light" light expand="md">
                  <NavbarBrand href="/dat-xe">
                     Trang đặt xe
                  </NavbarBrand>
                  <Nav navbar className="ml-left">
                     
                     <NavItem >
                           <NavLink>Xin chào quý khách</NavLink>
                     </NavItem>
                     <NavItem>
                           <NavLink href="#" onClick={() => this.thoatRa()} >Thoát ra</NavLink>
                     </NavItem>
                  </Nav>
                  {this.props.moChiDuong === true
                  ?
                  <Button className="ml-auto" color="warning" onClick={() => this.hienChiDuong()}>{this.props.stj===false?'Mở chỉ đường':'Đóng chỉ đường'}</Button>
                  : null}
               </Navbar>
               
            </div>
         );
      }  
   }
   
}

const mapStateToProps = state => {
   return {
      stj: state.datxe
   }
}

export default connect(mapStateToProps, action )(MenuDatXe)