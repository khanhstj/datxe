import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Col, } from 'reactstrap'
import 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'
import L from 'leaflet'
import viTri from '../../../../src/viTri.png'


var viTri_icon = L.icon({
   iconUrl: viTri,
   iconSize: [30, 30],
})

class DatXeThanhCong extends Component {
   constructor(props) {
      super(props)
      this.state={
         chiDuongToggle: true,
         
      }
   }
   

   render() {
      return (
         <div>
            <h5>Thông tin đặt xe của bạn</h5>
            <Form>
               <FormGroup row>
                  <Col sm={3}><Label>Số điện thoại</Label></Col>
                  <Col sm={9}><Input type="text" value={localStorage.getItem('sdtKhachHang')} readOnly /></Col>
               </FormGroup>

               <FormGroup row>
                  <Col sm={3}><Label>Điểm đi</Label></Col>
                  <Col sm={9}><Input type="text"  value={localStorage.getItem('viTriDiemDi')} readOnly /></Col>
               </FormGroup>

               <FormGroup row>
                  <Col sm={3}><Label>Điểm đến</Label></Col>
                  <Col sm={9}><Input type="text" value={localStorage.getItem('viTriDiemDen')} readOnly /></Col>
               </FormGroup>
               <FormGroup row>
                  <Col sm={3}><Label>Số tiền dự kiến</Label></Col>
                  <Col sm={9}><Label>Giá tiền ước lượng VNĐ</Label></Col>
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