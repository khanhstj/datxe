import React, { Component } from 'react';
import {FormGroup, Label, Input, Form} from 'reactstrap'

class BacTaiBiKhoa extends Component {
   render() {
      return (
         <div>
            {(JSON.parse(localStorage.getItem('bactai')).trangthai) === 'Chưa kích hoạt'
            ? <h5>Tài khoản của bạn chưa được kích hoạt, vui lòng chờ trong khi chúng tôi xét duyệt tài khoản của bạn</h5>
            : <h5>Tài khoản của bạn đã bị khóa, liên hệ tổng đài để biết thêm chi tiết</h5>
            }
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

export default BacTaiBiKhoa;