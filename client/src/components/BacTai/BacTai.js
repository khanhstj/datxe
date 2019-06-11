import React, { Component } from 'react';
import MenuBacTai from './MenuBacTai/MenuBacTai'
import MapsBacTai from './MapsBacTai/MapsBacTai'
import {Container, Row, Col} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import FormBacTai from './FormBacTai/FormBacTai'
import io from 'socket.io-client';
import BacTaiBiKhoa from './FormBacTai/BacTaiBiKhoa'

class BacTai extends Component {

   constructor(props) {
      super(props);
      this.state = {
         vido: null,
         kinhdo: null,
         coToaDo: false,
         err: null,
         chayXe: false,
         sdtKhachHang: '',
         hoTenKhachHang: '',
         diaDiemDonKhach: '',
         diemDen: '',
      }
      this.socket = null
   }
   componentWillMount() {
      if(this.state.nhanxe === true) {
         this.socket.on('yeucaudatxe', data => {
            alert('Có yêu cầu đặt xe')
            this.setState({
               sdtKhachHang: data.sdtKhachHang,
               //hoTenKhachHang: data.hoTenKhachHang,
               diaDiemDonKhach: data.diaDiemDonKhach,
               diemDen: data.diemDen,
               noiDonKhach_viDo: data.noiDonKhach_viDo,
               noiDonKhach_kinhDo: data.noiDonKhach_kinhDo,
               noiTraKhach_viDo: data.noiTraKhach_viDo,
               noiTraKhach_kinhDo: data.noiTraKhach_kinhDo,
            })

         })
      }
   }
   componentDidMount() {
      this.geoId = navigator.geolocation.watchPosition(
         (position) => {
            this.forceUpdate()
            this.setState({               
               vido: position.coords.latitude,
               kinhdo: position.coords.longitude,
               coToaDo: true
            })
         },
         (error) => {
           console.log(error)
         }
       )
   }

   componentWillUnmount() {
      navigator.geolocation.clearWatch(this.geoId)
   }

   ChayXe_TamDung = (hanhDong) => {
      if(hanhDong === 'chayxe') {
         if(this.state.coToaDo === true) {
            this.socket = io('http://localhost:8797/')
            this.setState({
               chayXe: true
            })
            this.socket.emit('chayxe', {
               username: JSON.parse(localStorage.getItem('bactai')).username,
               viDo: this.state.vido,
               kinhDo: this.state.kinhdo,
               hoten: JSON.parse(localStorage.getItem('bactai')).hoten,
               soxe: JSON.parse(localStorage.getItem('bactai')).soxe,
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
         luaChon: luaChon
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
                  
               <Container>
                  {this.state.coToaDo?''
                  :<Row>
                     <Col xs="4"></Col>
                     <Col><h4>Đang lấy vị trí</h4></Col>
                  </Row> }              
                  <Row>
                     <Col xs="6">{this.state.coToaDo
                        ?<MapsBacTai vido={this.state.vido} kinhdo={this.state.kinhdo} />
                        :<MapsBacTai vido={10.832767} kinhdo={106.612752} coToaDo={false} />}
                     </Col>
                     <Col xs="6">
                        {(JSON.parse(localStorage.getItem('bactai')).trangthai === 'Đã kích hoạt')
                        ? <FormBacTai sdtKhachHang={this.state.sdtKhachHang} hoTenKhachHang={this.state.hoTenKhachHang} diaDiemDonKhach={this.state.diaDiemDonKhach} diemDen={this.state.diemDen} NhanChuyen_BoQua={this.NhanChuyen_BoQua} chayxe={this.state.chayXe}/>
                        : <BacTaiBiKhoa />
                        }
                     </Col>
                  </Row>
               </Container>
            </div>

         );
      }     
  }
}
export default BacTai;