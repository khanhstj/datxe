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
   
   /*
   componentDidMount() {
      const map = this.leafletMap.leafletElement
      L.Routing.control({
         waypoints: [
            L.latLng(57.74, 11.94),
            L.latLng(57.6792, 11.949)
         ]
      }).addTo(map)
   }
   */


  render() {

   
   const position = [this.props.vido, this.props.kinhdo];
   return (
      <div>
      <Map ref={map => {this.leafletMap = map}} center={position} className="bando"  zoom={14}>
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
export default MapsDatXe;


/*
{(this.props.viDoDen !== null)
         ? 
         <Marker position={[this.props.viDoDi, this.props.kinhDoDi]} icon={diemDi_icon}>
            <Popup>Điểm đi</Popup>
         </Marker>
         <Marker position={[this.props.viDoDen, this.props.kinhDoDen]} icon={diemDen_icon}>
            <Popup>Điểm đến</Popup>
         </Marker> 
         :
         <h5>ab</h5>
         }

/*
import React, { Component } from 'react'
import {Map, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'
import L from 'leaflet'



class MapsDatXe extends Component {

   componentDidMount() {
      const map = this.leafletMap.leafletElement
      L.Routing.control({
         waypoints: [
            L.latLng(57.74, 11.94),
            L.latLng(57.6792, 11.949)
         ]
      }).addTo(map)
   }
   

   render() {

      return (
         <div>
            <Map ref={map => {this.leafletMap = map}} center={[57.74, 11.94]} className="bando"  zoom={14}>
				 <TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				 />
				 
         
			</Map>
            
         </div>
      );
   }
}

export default MapsDatXe;*/