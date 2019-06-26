import React, { Component } from 'react';
//import 'react-leaflet'
import 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'

import L from 'leaflet'


class TestRouting extends Component {
   componentDidMount() {
      var map = L.map('map').setView([51.505, -0.09], 13)
         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         }).addTo(map);
         L.Routing.control({
            waypoints: [
              L.latLng(57.74, 11.94),
              L.latLng(57.6792, 11.949)
            ]
          }).addTo(map);
   }
   render() {
      
      return (
         <div id="map" style={{"height": "500px"}} />
      );
   }
}

export default TestRouting;