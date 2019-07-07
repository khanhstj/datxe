import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'
import L from 'leaflet'

import diemDi from '../../src/diemDi.png'
import diemDen from '../../src/diemDen.png'

var diemDi_icon = L.icon({
   iconUrl: diemDi,
   iconSize: [30, 30]
})
var diemDen_icon = L.icon({
   iconUrl: diemDen,
   iconSize: [30, 30]
})

class TestRouting extends Component {
   constructor(props) {
      super(props)
      this.state={
         chiDuong: false
      }
   }
   shouldComponentUpdate(nextProps, nextState) {
      return true
   }
   componentDidUpdate(prevProps, prevState) {
      
         var map = L.map('map').setView([localStorage.getItem('viDoDiemDi'), localStorage.getItem('kinhDoDiemDi')], 13)
      
         L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1Ijoic3RpbmdlcnN0IiwiYSI6ImNqd3B2MnRiNjExZDg0NXByZDJtNXNzNnIifQ.ADQOrxvk6JctXY_wLklSHw'
         }).addTo(map);
         L.Routing.control({
            waypoints: [
               L.latLng(localStorage.getItem('viDoDiemDi'), localStorage.getItem('kinhDoDiemDi')),
               L.latLng(localStorage.getItem('viDoDiemDen'), localStorage.getItem('kinhDoDiemDen'))
            ]
            }).addTo(map);
         L.marker([localStorage.getItem('viDoDiemDi'), localStorage.getItem('kinhDoDiemDi')], {icon: diemDi_icon}).addTo(map)
         .bindPopup('Điểm đi')
         L.marker([localStorage.getItem('viDoDiemDen'), localStorage.getItem('kinhDoDiemDen')], {icon: diemDen_icon}).addTo(map)
         .bindPopup('Điểm đến')
         
   }
   

   moChiDuong = () => {
      this.setState(prevState => ({
         chiDuong: !prevState.chiDuong
     }));
   }
   render() {
      
      
      return (
         <div>
            <Button onClick={() => this.moChiDuong()} >Đóng/mở chỉ đường</Button>
            <Modal className="bigModal" isOpen={this.state.chiDuong} toggle={() => this.moChiDuong()}>
               <ModalHeader toggle={() => this.moChiDuong()}>Chỉ đường</ModalHeader>
               <ModalBody>
                  
                  <div id="map" style={{"width": "95%", "height": "500px"}} />
                  abc
               </ModalBody>
            </Modal>
         </div>
      );
   }
}

export default TestRouting