import React, { Component } from 'react'
import MenuDatXe from './MenuDatXe/MenuDatXe'
import FormDatXe from './FormDatXe/FormDatXe'
import DatXeThanhCong from './FormDatXe/DatXeThanhCong'
import MapsDatXe from './MapsDatXe/MapsDatXe'
import {Container, Row, Col} from 'reactstrap'
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
         err: null,
         sdtDatXe: '',
         tenDiemDi: '',
         tenDiemDen: '',
         noiDonKhach_viDo: null,
         noiDonKhach_kinhDo: null,
         noiTraKhach_viDo: null,
         noiTraKhach_kinhDo: null,
         daDatXe: false,
         messages: [
            {
               id: 1, userId: 0, message: 'Hello'
            }
         ],
         user: null,
      }
      this.socket = null
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

   componentWillUnmount() {
      navigator.geolocation.clearWatch(this.geoId)
   }

   DatXe = (sdt, diemDi, diemDen, tenDiemDi) => {
      axios.get('https://nominatim.openstreetmap.org/search?format=json&q='+diemDen)
      .then(response => {
         
         this.setState({
            sdtDatXe: sdt,
            tenDiemDen: diemDen,
            noiTraKhach_viDo: response.data[0].lat,
            noiTraKhach_kinhDo: response.data[0].lon,
         })
         if(diemDi !== true) {
            axios.get('https://nominatim.openstreetmap.org/search?format=json&q='+diemDi)
            .then(res => {
               this.setState({
                  tenDiemDi: diemDi,
                  noiDonKhach_viDo: res.data[0].lat,
                  noiDonKhach_kinhDo: res.data[0].lon,
               })
               this.socket = io('http://localhost:8797/')
               this.socket.emit('datxe', {
                  sdtKhachHang: sdt,
                  
                  noiDonKhach_viDo: this.state.noiDonKhach_viDo,
                  noiDonKhach_kinhDo: this.state.noiDonKhach_kinhDo,
                  noiTraKhach_viDo: this.state.noiTraKhach_viDo,
                  noiTraKhach_kinhDo: this.state.noiTraKhach_kinhDo,
               })
            })
         }
         else {
            this.setState({tenDiemDi: tenDiemDi})
            this.socket = io('http://localhost:8797/')
               this.socket.emit('datxe', {
                  sdtKhachHang: sdt,
                  noiDonKhach_viDo: this.state.vido,
                  noiDonKhach_kinhDo: this.state.kinhdo,
                  noiTraKhach_viDo: this.state.noiTraKhach_viDo,
                  noiTraKhach_kinhDo: this.state.noiTraKhach_kinhDo,
               })

         }
         this.setState({daDatXe: true})
      })
   }

   render() {
      if(this.state.coToaDo === true) {
         return (
            <div>
               <MenuDatXe />
               <Container>
                  <Row>
                  <Col xs="6"><MapsDatXe vido={this.state.vido} kinhdo={this.state.kinhdo} coToaDo={true} viDoDi={this.state.viDoDi} kinhDoDi={this.state.kinhDoDi} viDoDen={this.state.viDoDen} kinhDoDen={this.state.kinhDoDen} /></Col>
                  <Col xs="6">
                     {this.state.daDatXe !== true
                     ? <FormDatXe guiYeuCauDatXe={this.DatXe} vido={this.state.vido} kinhdo={this.state.kinhdo} coToaDo={true} daDatXe={this.state.daDatXe} />
                     : <DatXeThanhCong sdtDatXe={this.state.sdtDatXe} tenDiemDi={this.state.tenDiemDi} tenDiemDen={this.state.tenDiemDen} />
                     }
                  </Col>
                  </Row>
               </Container>  
            </div>

         );
      }
      else {
         return (
            <div>
               <MenuDatXe />
               <Container> 
                  <Row>
                     <Col xs="4"></Col>
                     <Col><h4>Đang lấy vị trí</h4></Col>
                  </Row>                
                  <Row>
                     <Col xs="6"><MapsDatXe vido={10.832767} kinhdo={106.612752} coToaDo={false} viDoDi={this.state.viDoDi} kinhDoDi={this.state.kinhDoDi} viDoDen={this.state.viDoDen} kinhDoDen={this.state.kinhDoDen} /></Col>
                     <Col xs="6">
                        {this.state.daDatXe !== true
                        ? <FormDatXe guiYeuCauDatXe={this.DatXe} daDatXe={this.state.daDatXe} />
                        : <DatXeThanhCong />
                        }
                        </Col>
                  </Row>
               </Container>
            </div>

         );
      }
   }
}

export default DatXe;