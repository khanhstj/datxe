import React, { Component } from 'react';
import {Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.js'
import 'leaflet/dist/leaflet.css'
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

   const position = [this.props.vido, this.props.kinhdo];
   return (
      <div>
      <Map className="bando" center={position} zoom={14}>
         <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
         />
         <Marker position={position} icon={viTri_icon} >
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
         </Marker>
      </Map>
      
      </div>
   );
  }
}
export default MapsBacTai;
