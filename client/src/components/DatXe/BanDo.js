import React, { Component } from 'react'
import 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'
import L from 'leaflet'

class BanDo extends Component {
   
   componentDidMount() {
      var map = L.map('map').setView([10.793779, 106.723988], 13)

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
         maxZoom: 18,
         id: 'mapbox.streets',
         accessToken: 'pk.eyJ1Ijoic3RpbmdlcnN0IiwiYSI6ImNqd3B2MnRiNjExZDg0NXByZDJtNXNzNnIifQ.ADQOrxvk6JctXY_wLklSHw'
      }).addTo(map);
      
   }

   render() {
      
      return (
         <div id="map" style={{"width": "100%", "height": "550px"}} />   
      );
   }
}


export default BanDo