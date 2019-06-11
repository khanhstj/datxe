import React, { Component } from 'react'
import {Map, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'
import L from 'leaflet'



class abc extends Component {

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
            <Map ref={map => {this.leafletMap = map}} center={[57.74, 11.94]} className="bando"  zoom={13}>
				 <TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				 />
				 
         
			</Map>
            
         </div>
      );
   }
}

export default abc;