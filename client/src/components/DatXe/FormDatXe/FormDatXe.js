import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap'
import axios from 'axios'
import validator from 'validator'
import Loading from '../../Loading'


class FormDatXe extends Component {

   constructor(props) {
      super(props);
      this.state = {
         txt_sdt: '',
         txt_diemDi: '',
         txt_diemDen: '',
         btn_layViTri: false,
         viTriDiemDi: '',
         viTriDiemDen: '',
         loading: false,
         
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
            this.setState({
               viTriDiemDi: res.data[0].display_name
            })
            localStorage.setItem('viTriDiemDi', res.data[0].display_name)
            
         })
      }
   }
   
   capNhat = () => {
      this.props.capNhat_DatXeThanhCong()
   }

   DatXe = () => {
      if(validator.isMobilePhone(this.state.txt_sdt, 'vi-VN')===true) {
         
         if(this.state.btn_layViTri === false && this.state.txt_sdt !== '' && this.state.txt_diemDi !== '' && this.state.txt_diemDen !== '') {
            this.setState({loading: true})
            localStorage.setItem('sdtKhachHang', this.state.txt_sdt)

            axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${this.state.txt_diemDi}`).then(response=> {
               localStorage.setItem('viDoDiemDi', response.data[0].lat)
               localStorage.setItem('kinhDoDiemDi', response.data[0].lon)
               localStorage.setItem('viTriDiemDi', response.data[0].display_name)

               axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${this.state.txt_diemDen}`).then(res=> {
                  this.setState({
                     viTriDiemDen: res.data[0].display_name
                  })
                  localStorage.setItem('viDoDiemDen', res.data[0].lat)
                  localStorage.setItem('kinhDoDiemDen', res.data[0].lon)
                  localStorage.setItem('viTriDiemDen', res.data[0].display_name)
                  this.capNhat()
               })
            })
         }
         //Phần này hoàn thiện sau
         else if(this.state.btn_layViTri === true && this.state.txt_sdt !== '' && this.state.txt_diemDen !== '') {
            //this.props.guiYeuCauDatXe(this.state.txt_sdt, this.state.txt_diemDi, this.state.txt_diemDen, this.state.viTriDiemDi)
            localStorage.setItem('sdtKhachHang', this.state.txt_sdt)
            axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${this.state.txt_diemDen}`).then(res =>{
               localStorage.setItem('viTriDiemDen', res.data[0].display_name)
            })
            
         }
         else {
            alert('Vui lòng nhập đủ thông tin để đặt xe!!!')
         }      
      }
      else {
         alert('Vui lòng nhập chính xác số điện thoại của bạn!!!')
      }
      
   }

   
   render() {
      if(this.state.loading === true) {
         return <Loading/>
      }
      else {
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
                        <Input type="text" name="txt_diemDi" onChange={(e) => this.handleDiemDiChange(e)} value={this.state.txt_diemDi} placeholder="Nhập vị trí điểm đi" />
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
}

export default FormDatXe