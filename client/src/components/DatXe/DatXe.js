import React, { Component } from 'react'
import { connect } from 'react-redux'
import MenuDatXe from './MenuDatXe/MenuDatXe'
import FormDatXe from './FormDatXe/FormDatXe'
import DatXeThanhCong from './FormDatXe/DatXeThanhCong'
import MapsDatXe from './MapsDatXe/MapsDatXe'
import ChiDuong from './ChiDuong'
import {Container, Row, Col, Spinner } from 'reactstrap'
import io from 'socket.io-client';
import axios from 'axios'

class DatXe extends Component {
   constructor(props) {
      super(props);
      this.state = {
         vido: null,
         kinhdo: null,
         viDoDi: null,
         kinhDoDi: null,
         viDoDen: null,
         kinhDoDen: null,
         coToaDo: false,
         sdtDatXe: '',
         tenDiemDi: '',
         tenDiemDen: '',
         noiDonKhach_viDo: null,
         noiDonKhach_kinhDo: null,
         noiTraKhach_viDo: null,
         noiTraKhach_kinhDo: null,
         muonDatXe: false,
         daDatXe: false,
         hienChiDuong: false,
         hoTenBactai: '',
         sdtBacTai: '',
         soXe: '',
         capNhatLai: localStorage.getItem('viTriDiemDen')
      }
      this.socket = null
   }
   componentWillMount() {
      console.log('Will mount component DatXeThanhCong')
      if(localStorage.getItem('viTriDiemDen') !== null) {
         this.socket = io('http://localhost:8797')
         this.socket.on('phanhoi', res => this.setState({
            hoTenBactai: res.hoTenBactai,
            sdtBacTai: res.sdtBacTai,
            soXe: res.soXe,
         }))
      }
      
   }
   componentDidMount() {
      this.geoId = navigator.geolocation.watchPosition(
         (position) => {
            this.setState({               
               vido: position.coords.latitude,
               kinhdo: position.coords.longitude,
               coToaDo: true
            })
            this.forceUpdate()
         },
         (error) => {
           console.log(error)
         }
      )
      console.log('Did Mount component DatXe')
      if(localStorage.getItem('viTriDiemDen') !== null) {
         this.socket.emit('datxe', 'abc')
      }
   }

   shouldComponentUpdate(nextProps, nextState) {
      
      if(this.state.capNhatLai === nextState.capNhatLai) {
         return false
      }
      else {
         return true
      }
      
     
   }

   componentWillUnmount() {
      navigator.geolocation.clearWatch(this.geoId)
   }

   capNhat_DatXeThanhCong = () => {
      this.setState({
         capNhatLai: true
      })
      console.log('Cập nhật lại')
      
   }

   render() {
      if(this.state.coToaDo === true) {
         return (
            <div>
               {
                  localStorage.getItem('viTriDiemDen') !== null && this.props.moChiDuong === true
                  ?
                  <div>
                     <MenuDatXe moChiDuong={true} />
                     <ChiDuong />
                  </div>
                  :
                  localStorage.getItem('viTriDiemDen') !== null && this.props.moChiDuong === false
                  ?
                  <div>
                     <MenuDatXe moChiDuong={false} />
                     <Container>
                        <Row>
                           <Col xs="6"><MapsDatXe vido={this.state.vido} kinhdo={this.state.kinhdo} coToaDo={true} /></Col>
                           <Col xs="6">
                              <DatXeThanhCong sdtBacTai={this.state.sdtBacTai} />
                           </Col>
                        </Row>
                     </Container>
                  </div>
                  :
                  <div>
                     <MenuDatXe moChiDuong={false} />
                     <Container>
                        <Row>
                           <Col xs="6"><MapsDatXe vido={this.state.vido} kinhdo={this.state.kinhdo} coToaDo={true} /></Col>
                           <Col xs="6">
                              <FormDatXe vido={this.state.vido} kinhdo={this.state.kinhdo} coToaDo={true} capNhat_DatXeThanhCong={() => this.capNhat_DatXeThanhCong()} />
                           </Col>
                        </Row>
                     </Container>
                  </div>
               }
               </div>
         )
      }
      else {
         return (
            <div>Chưa nhận được tọa độ, sẽ load Maps lớn</div>
         )
      }
   }
}

const mapStateToProps = state => {
   return {
      moChiDuong: state.datxe
   }
}

export default connect(mapStateToProps, null) (DatXe)