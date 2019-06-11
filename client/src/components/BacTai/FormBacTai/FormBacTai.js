import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

class FormBacTai extends Component {
   constructor(props) {
      super(props);
      this.state = {
        
      }
   }

   NhanChuyen_BoQua = (luaChon) => {
      this.props.NhanChuyen_BoQua(luaChon)
   }


   render() {
      return (
         <div>
            {this.props.chayxe === true
            ?
            <Form>
               <FormGroup>
               <Label >Số điện thoại khách hàng</Label>
               <Input type="text" value={this.props.sdtKhachHang} readOnly placeholder="Số điện thoại khách hàng sẽ hiển thị ở đây" />
               </FormGroup>
               <FormGroup>
               <Label>Họ tên khách hàng</Label>
               <Input type="text" value={this.props.hoTenKhachHang} readOnly placeholder="Họ tên khách hàng sẽ hiển thị ở đây" />
               </FormGroup>

               <FormGroup>
                  <Label>Địa điểm đón khách</Label>
                  <Input type="text" value={this.props.diaDiemDonKhach} readOnly placeholder="Địa điểm đón khách sẽ hiển thị ở đây" />
               </FormGroup>
               
               <FormGroup>
                  <Label>Điểm đến</Label>
                  <Input type="text" value={this.props.diemDen} readOnly placeholder="Điểm đến sẽ hiển thị ở đây" />
               </FormGroup>
               
                  <FormGroup row>
                     <Col sm={2}/>
                     <Col sm={4}><Button onClick={() => this.NhanChuyen_BoQua(true)} color="primary">Nhận chuyến</Button></Col>
                     <Col sm={4}><Button onClick={() => this.NhanChuyen_BoQua(false)} color="warning">Bỏ qua chuyến</Button></Col>
                  </FormGroup>
                  
            </Form>
            :
            <div>
               <h6>Thông tin của bạn</h6>
               <Form>
                  <FormGroup>
                  <Label >Số điện thoại đăng ký</Label>
                  <Input type="text" value={JSON.parse(localStorage.getItem('bactai')).username} readOnly />
                  </FormGroup>
                  <FormGroup>
                  <Label>Họ tên</Label>
                  <Input type="text" value={JSON.parse(localStorage.getItem('bactai')).hoten} readOnly  />
                  </FormGroup>

                  <FormGroup>
                     <Label>Số xe</Label>
                     <Input type="text" value={JSON.parse(localStorage.getItem('bactai')).soxe} readOnly />
                  </FormGroup>
                  
                  <FormGroup>
                     <Label>Trạng thái tài khoản</Label>
                     <Input type="text" value={JSON.parse(localStorage.getItem('bactai')).trangthai} readOnly />
                  </FormGroup>
      
               </Form>
            </div>

         }
         </div>
         
         
         
         
      );
   }
}

export default FormBacTai;