import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

class DatXeThanhCong extends Component {
   render() {
      return (
         <div>
            <h5>Thông tin đặt xe của bạn</h5>
            <Form>
               <FormGroup row>
                  <Col sm={3}><Label>Số điện thoại</Label></Col>
                  <Col sm={9}><Input type="text" value={this.props.sdtDatXe} readOnly /></Col>
               </FormGroup>

               <FormGroup row>
                  <Col sm={3}><Label>Điểm đi</Label></Col>
                  <Col sm={9}><Input type="text"  value={this.props.tenDiemDi} readOnly /></Col>
               </FormGroup>

               <FormGroup row>
                  <Col sm={3}><Label>Điểm đến</Label></Col>
                  <Col sm={9}><Input type="text" value={this.props.tenDiemDen} readOnly /></Col>
               </FormGroup>
            </Form>
            <h5>Thông tin bác tài</h5>
            <Form>
               <FormGroup row>
                     <Col sm={3}><Label>Họ tên</Label></Col>
                     <Col sm={9}><Input type="text" value={this.props.hoTenBacTai} readOnly /></Col>
                  </FormGroup>

                  <FormGroup row>
                     <Col sm={3}><Label>Số điện thoại</Label></Col>
                     <Col sm={9}><Input type="text"  readOnly /></Col>
                  </FormGroup>

                  <FormGroup row>
                     <Col sm={3}><Label>Biển số xe</Label></Col>
                     <Col sm={9}><Input type="text"  readOnly /></Col>
                  </FormGroup>
            </Form>
            { this.props.sdtBacTai === true
            ? <Button color="success">Đã đến nơi</Button>
            : null }
         </div>
      );
   }
}

export default DatXeThanhCong;