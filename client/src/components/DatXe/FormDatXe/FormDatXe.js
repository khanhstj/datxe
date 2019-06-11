import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import axios from 'axios';

class FormDatXe extends Component {

   constructor(props) {
      super(props);
      this.state = {
         txt_sdt: '',
         txt_diemDi: '',
         txt_diemDen: '',
         btn_layViTri: false,
         vitriDiemDi: 'Nhập địa chỉ điểm xuất phát', //placeholder
         vitriDiemDen: 'Nhập địa chỉ điểm đến', //placeholder
      }
   }

   handleSdtChange = (event) => {
      this.setState({txt_sdt:event.target.value})
   }
   handleDiemDiChange = (event) => {
      this.setState({txt_diemDi:event.target.value})
   }
   handleDiemDenChange = (event) => {
      this.setState({txt_diemDen:event.target.value})
   }
   layViTriHienTai = () => {
      this.setState({btn_layViTri: true})
      if(this.props.coToaDo !== true){
         alert('Đang xác định vị trí của bạn, vui lòng chờ trong giây lát')
      }
      else {
         axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${this.props.vido},${this.props.kinhdo}`)
         .then(res => {
            this.setState({vitriDiemDi: res.data[0].display_name})
         })
      }
   }

   DatXe = () => {
      if(this.state.btn_layViTri === true) {
         this.props.guiYeuCauDatXe(this.state.txt_sdt, this.state.btn_layViTri, this.state.txt_diemDen, this.state.vitriDiemDi)
      }
      else if(this.state.txt_sdt !== '' && this.state.txt_diemDi !== '' && this.state.txt_diemDen !== '') {
         this.props.guiYeuCauDatXe(this.state.txt_sdt, this.state.txt_diemDi, this.state.txt_diemDen, this.state.vitriDiemDi)
      }
      else {
         alert('Vui lòng nhập đủ thông tin để đặt xe!!!')
      }
      
   }

   render() {
      return (
         <div>
            <Form>
               <Label><h4>Nhập thông tin để thực hiện đặt xe</h4></Label>
               <FormGroup row>
                  <Label sm={3}>Số điện thoại:</Label>
                  <Col sm={9}>
                     <Input type="text" name="txt_sdt" onChange={(e) => this.handleSdtChange(e)} value={this.state.txt_sdt} placeholder="Nhập số điện thoại của bạn để bác tài có thể liên lạc" />
                  </Col>
                  
               </FormGroup>
               <FormGroup row>
                  <Label sm={3} for="exampleNumber">Điểm đi</Label>
                  <Col >
                     <Button color="info" onClick={() => this.layViTriHienTai()}>Lấy vị trí hiện tại</Button>
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label sm={3} for="exampleNumber">hoặc</Label>
                  <Col sm={9}>
                     <Input type="text" name="txt_diemDi" onChange={(e) => this.handleDiemDiChange(e)} value={this.state.txt_diemDi} placeholder={this.state.vitriDiemDi} />
                  </Col>
                  
               </FormGroup>
               
               <FormGroup row>
                  <Label sm={3} for="exampleNumber">Điểm đến</Label>
                  <Col sm={9}>
                     <Input type="text" name="txt_diemDen" onChange={(e) => this.handleDiemDenChange(e)} value={this.state.txt_diemDen} placeholder="Nhập vị trí điểm đến" />
                  </Col>
               </FormGroup>

               <FormGroup row>
                  <Col sm={5}></Col>
                  <Button color="primary" onClick={() => this.DatXe()}>Xác nhận</Button>
                  <Col sm={3}></Col>
               </FormGroup>

               
            </Form>
         </div>
         
      );
   }
}

export default FormDatXe;