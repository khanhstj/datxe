import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class FormBacTai extends Component {

   render() {
      return (
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
         
      );
   }
}

export default FormBacTai;