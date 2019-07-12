import React, { Component } from 'react';
import {Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.js'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import viTri from '../../../../src/viTri.png'

var viTri_icon = L.icon({
   iconUrl: viTri,
   iconSize: [30, 30],
})

class MapsBacTai extends Component {

   constructor (props) {
      super(props);
      this.state = {
         
      }
   }

  render() {

      console.log('Render MapsBacTai')
      if(this.props.coToaDo === true) {
         const position = [this.props.vido, this.props.kinhdo];
         return (
            <div>
               <Map center={position} className="bando"  zoom={14}>
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
      else {
         return (
            <div>Chưa có tọa độ</div>
         )
      }
  }
}
export default MapsBacTai;
