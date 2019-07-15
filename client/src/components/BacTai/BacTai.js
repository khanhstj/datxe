import React, { Component } from 'react'
import {Container, Row, Col, Spinner } from 'reactstrap'
import {Redirect} from 'react-router-dom'

import MenuBacTai from './MenuBacTai/MenuBacTai'
import MapsBacTai from './MapsBacTai/MapsBacTai'
import FormBacTai from './FormBacTai/FormBacTai'
import ChayXe from './FormBacTai/ChayXe'
import BacTaiBiKhoa from './FormBacTai/BacTaiBiKhoa'

import io from 'socket.io-client'
import { connect } from 'react-redux'
import axios from 'axios';

class BacTai extends Component {

   constructor(props) {
      super(props);
      this.state = {
         vido: null,
         kinhdo: null,
         coToaDo: false,
         chayXe: false,
         id_KH: '',
         sdt_KH: '',
         viDoDi_KH: '',
         kinhDoDi_KH: '',
         viTriDiemDi_KH: '',
         viDoDen_KH: '',
         kinhDoDen_KH: '',
         viTriDiemDen_KH: '',
         
      }
      this.socket = null
   }
   componentWillMount() {
      console.log('Component Will Mount BacTai')
      this.socket = io('http://localhost:8797')
      this.socket.on('yeucauxe', res => this.yeuCauXe(res))
   }

   yeuCauXe (res) {
      alert('Có 1 yêu cầu đặt xe')
      this.setState({
         id_KH: res.id_KH,
         sdt_KH: res.sdt_KH,
         viDoDi_KH: res.viDoDi_KH,
         kinhDoDi_KH: res.kinhDoDi_KH,
         viTriDiemDi_KH: res.viTriDiemDi_KH,
         viDoDen_KH: res.viDoDen_KH,
         kinhDoDen_KH: res.kinhDoDen_KH,
         viTriDiemDen_KH: res.viTriDiemDen_KH,
      })
   }

   componentDidMount() {
      console.log('Component Did Mount BacTai')
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

   componentWillUnmount() {
      navigator.geolocation.clearWatch(this.geoId)
      this.socket.close()
   }

   ChayXe_TamDung = (hanhDong) => {
      if(hanhDong === 'chayxe') {
         if(this.state.coToaDo === true) {
            this.socket.emit('chayxe', {
               sdt_BT: JSON.parse(localStorage.getItem('bactai')).username,
               viDo_BT: this.state.vido,
               kinhDo_BT: this.state.kinhdo,
               hoTen_BT: JSON.parse(localStorage.getItem('bactai')).hoten,
               soXe_BT: JSON.parse(localStorage.getItem('bactai')).soxe,
            })
            this.setState({
               chayXe: true
            })
           
         }
         else {
            alert('Vui lòng chờ đến khi định vị thành công')
         }
      }
      else {
         this.setState({
            chayXe: false
         })
         this.socket.emit('tamdung', {
            username: JSON.parse(localStorage.getItem('bactai')).username,
   
         })
      }
   }
   
   NhanChuyen_BoQua = (luaChon) => {
      this.socket.emit('nhanchuyen_boqua', {
         id_KH: this.state.id_KH,
         luaChon: luaChon,
         sdt_BT: JSON.parse(localStorage.getItem('bactai')).username,
         hoTen_BT: JSON.parse(localStorage.getItem('bactai')).hoten,
         soXe_BT: JSON.parse(localStorage.getItem('bactai')).soxe,
      })
      console.log('Đã nhận chuyến')
   }

   DenNoi = () => {
      axios.get(`http://localhost:8797/hoan-tat-chuyen?bacTai=${JSON.parse(localStorage.getItem('bactai')).username}&sdt_KH=${this.state.sdt_KH}&viTriDiemDi_KH=${this.state.viTriDiemDi_KH}&viTriDiemDen_KH=${this.state.viTriDiemDen_KH}`)
      
      this.socket.emit('tamdung', {
         username: JSON.parse(localStorage.getItem('bactai')).username
      })
      this.setState({
         chayXe: false
      })
   }

   render() {
      if(!localStorage.getItem('bactai')) {
         alert('Bạn phải đăng nhập mới có thể vào trang này!!!')
         return <Redirect to='/' />
      }
 
      else {
         return (
            <div>
               <MenuBacTai ChayXe_TamDung={this.ChayXe_TamDung} chayXe={this.state.chayXe} />
               {
                  this.state.coToaDo === true
               ?
                  ''
               :
               <div className="centerItems"><Spinner color="warning"/>  <h4>Đang xác định vị trí của bạn</h4></div>
               }
               <Container>     
                  <Row>
                     <Col xs="6">
                     {
                        this.state.coToaDo === true
                        ?
                        <MapsBacTai vido={this.state.vido} kinhdo={this.state.kinhdo} coToaDo={true} />
                        :
                        <MapsBacTai coToaDo={false} />
                     }
                     </Col>
                     <Col xs="6">
                        {(JSON.parse(localStorage.getItem('bactai')).trangthai === 'Đã kích hoạt') && this.state.chayXe === false
                        ? 
                        <FormBacTai />
                        : (JSON.parse(localStorage.getItem('bactai')).trangthai === 'Đã kích hoạt') && this.state.chayXe===true
                        ?
                        <ChayXe sdt_KH={this.state.sdt_KH} viTriDiemDi_KH={this.state.viTriDiemDi_KH} viTriDiemDen_KH={this.state.viTriDiemDen_KH} NhanChuyen_BoQua={this.NhanChuyen_BoQua} DenNoi={this.DenNoi} />
                        :
                        <BacTaiBiKhoa />
                        }
                     </Col>
                  </Row>
               </Container>
            </div>

         );
      }     
  }
}

const mapStateToProps = (state) => {
   if(JSON.parse(localStorage.getItem('bactai')).trangthai === 'Đã kích hoạt') {
      return {
         moChiDuong: state.bactai,
         chayXe: state.datxe,
      }
   }
   else {
      return {
         moChiDuong: state.bactai
      }
   }
}

export default connect (mapStateToProps, null) (BacTai)