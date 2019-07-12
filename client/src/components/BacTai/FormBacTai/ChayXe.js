import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap'

class ChayXe extends Component {
   constructor(props) {
      super(props)
      this.state = { 
         daNhanChuyen: false
      }
   }

   NhanChuyen_BoQua = (hanhdong) => {
      this.props.NhanChuyen_BoQua(hanhdong)
      if(hanhdong === true) {
         this.setState({
            daNhanChuyen: true
         })
      }
   }

   DenNoi = () => {
      this.props.DenNoi()
   }

   render() {
      return (
         <div>
            <Form>
               <FormGroup>
                  <Label >Số điện thoại khách hàng</Label>
                  <Input type="text" value={this.props.sdt_KH} readOnly placeholder="Số điện thoại khách hàng sẽ hiển thị ở đây" />
                  </FormGroup>
                  <FormGroup>
                  <Label>Họ tên khách hàng</Label>
                  <Input type="text" readOnly placeholder="Họ tên khách hàng sẽ hiển thị ở đây" />
               </FormGroup>

               <FormGroup>
                     <Label>Địa điểm đón khách</Label>
                     <Input type="text" value={this.props.viTriDiemDi_KH} readOnly placeholder="Địa điểm đón khách sẽ hiển thị ở đây" />
               </FormGroup>
                  
               <FormGroup>
                     <Label>Điểm đến</Label>
                     <Input type="text" value={this.props.viTriDiemDen_KH} readOnly placeholder="Điểm đến sẽ hiển thị ở đây" />
               </FormGroup>
                  
               {
                  this.state.daNhanChuyen === false
                  ?
                  <FormGroup row>
                     <Col sm={4}><Button onClick={() => this.NhanChuyen_BoQua(true)} color="primary">Nhận chuyến</Button></Col>
                     <Col sm={4}><Button onClick={() => this.NhanChuyen_BoQua(false)} color="warning">Bỏ qua chuyến</Button></Col>
                  </FormGroup>
                  :
                  <FormGroup row>
                     <div className="centerItems"><Button onClick={() => this.DenNoi()} color="primary">Đến nơi</Button></div>
                  </FormGroup>

               }
               
                     
            </Form>
         </div>
      );
   }
}

export default ChayXe;