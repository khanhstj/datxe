import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import MenuDatXe from './MenuDatXe/MenuDatXe'
import FormDatXe from './FormDatXe/FormDatXe'
import DatXeThanhCong from './FormDatXe/DatXeThanhCong'
import MapsDatXe from './MapsDatXe/MapsDatXe'
import ChiDuong from './ChiDuong'
import {Container, Row, Col, Spinner } from 'reactstrap'
import io from 'socket.io-client';
import BanDo from './BanDo'

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
         hoTenBacTai: '',
         sdtBacTai: '',
         soXe: '',
         daDenNoi: false,
         capNhatLai: 0
      }
      this.socket = null
   }

   componentWillMount() {
      console.log('Will mount component DatXeThanhCong')
      this.socket = io('http://localhost:8797')
      this.socket.on('bactainhanchuyen', res => {this.phanHoi(res)})
      this.socket.on('khongcobactai', res => {this.khongCoBacTai()})
   }

   phanHoi (m) {
      alert('Đã có bác tài nhận chuyến')
      this.setState({
         sdtBacTai: m.sdt_BT,
         hoTenBacTai: m.hoTen_BT,
         soXe: m.soXe_BT,
         capNhatLai: this.state.capNhatLai + 1
      })
      console.log(m.sdt_BT)
   }

   khongCoBacTai () {
      alert('Hiện không có bác tài nào trong khu vực này, xin quý khách thông cảm')
   }

   datXe = () => {
      this.socket.emit('datxe', {
         sdt_KH: localStorage.getItem('sdtKhachHang'),
         viDoDi_KH: localStorage.getItem('viDoDiemDi'),
         kinhDoDi_KH: localStorage.getItem('kinhDoDiemDi'),
         viTriDiemDi_KH: localStorage.getItem('viTriDiemDi'),
         viDoDen_KH: localStorage.getItem('viDoDiemDen'),
         kinhDoDen_KH: localStorage.getItem('kinhDoDiemDen'),
         viTriDiemDen_KH: localStorage.getItem('viTriDiemDen'),
      })
      this.setState({
         capNhatLai: this.state.capNhatLai + 1
      })
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
      
   }

   shouldComponentUpdate(nextProps, nextState) {
      if(this.state.capNhatLai === nextState.capNhatLai && this.props.moChiDuong === nextProps.moChiDuong) {
         return false
      }
      else {
         return true
      }
   }

   componentWillUnmount() {
      //localStorage.clear()
      navigator.geolocation.clearWatch(this.geoId)
      this.socket.close()
   }

   denNoi = () => {
      localStorage.clear()
      this.setState({
         daDenNoi: true,
         capNhatLai: this.state.capNhatLai + 1
      })
   }

   render() {
      if(this.state.daDenNoi === true) {
         return <Redirect to="/" />
      }
      else {
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
                        <MenuDatXe moChiDuong={true} />
                        <Container>
                           <Row>
                              <Col xs="6"><MapsDatXe vido={this.state.vido} kinhdo={this.state.kinhdo} coToaDo={true} /></Col>
                              <Col xs="6">
                                 <DatXeThanhCong sdtBacTai={this.state.sdtBacTai} hoTenBacTai={this.state.hoTenBacTai} soXe={this.state.soXe} denNoi={() => this.denNoi()} />
                              </Col>
                           </Row>
                        </Container>
                     </div>
                     :
                     <div>
                        <MenuDatXe moChiDuong={false} />
                        <Container >
                           <Row>
                              <Col xs="6"><MapsDatXe vido={this.state.vido} kinhdo={this.state.kinhdo} coToaDo={true} /></Col>
                              <Col xs="6">
                                 <FormDatXe vido={this.state.vido} kinhdo={this.state.kinhdo} coToaDo={true} datXe={() => this.datXe()} />
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
               <div>
                  <MenuDatXe moChiDuong={false} />
                  <div className="centerItems"><Spinner color="warning"/>  <h4>Đang xác định vị trí của bạn</h4></div>
                  <BanDo />
               </div>
            )
         }
      }
   }
}

const mapStateToProps = state => {
   return {
      moChiDuong: state.datxe
   }
}

export default connect(mapStateToProps, null) (DatXe)