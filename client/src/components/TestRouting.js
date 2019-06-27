import React, { Component } from 'react';
//import 'react-leaflet'
import 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'

import L from 'leaflet'


class TestRouting extends Component {
   componentDidMount() {
      var map = L.map('map').setView([57.7422, 11.94444], 13)
         L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1Ijoic3RpbmdlcnN0IiwiYSI6ImNqd3B2NG1wcTFvNmc0OW9sYWdjbGh5Y2YifQ.cLSW-y-u87Qu6iJxQPivMg'
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
         <div id="map" style={{"width": "80%", "height": "500px"}} />
      );
   }
}

export default TestRouting;