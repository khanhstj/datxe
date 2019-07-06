import React, { Component } from 'react'
import {Map, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'
import L from 'leaflet'
import viTri from '../../../../src/viTri.png'
import diemDi from '../../../../src/diemDi.png'
import diemDen from '../../../../src/diemDen.png'


var viTri_icon = L.icon({
   iconUrl: viTri,
   iconSize: [30, 30],
})
var diemDi_icon = L.icon({
   iconUrl: diemDi,
   iconSize: [30, 30]
})
var diemDen_icon = L.icon({
   iconUrl: diemDen,
   iconSize: [30, 30]
})
class MapsDatXe extends Component {
   
  render() {
   console.log('Render')

   const position = [this.props.vido, this.props.kinhdo];
   return (
      <div>
         <Map center={position} className="bando"  zoom={15}>
            <TileLayer
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={position} icon={viTri_icon} >
               <Popup>Đây là vị trí hiện tại của bạn</Popup>
            </Marker>            
         </Map>
      </div>
   );
  }
}
export default MapsDatXe