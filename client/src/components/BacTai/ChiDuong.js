import React, { Component } from 'react';

import 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'
import L from 'leaflet'

import diemDi from '../../../src/diemDi.png'
import diemDen from '../../../src/diemDen.png'


var diemDi_icon = L.icon({
   iconUrl: diemDi,
   iconSize: [30, 30]
})
var diemDen_icon = L.icon({
   iconUrl: diemDen,
   iconSize: [30, 30]
})

class ChiDuong extends Component {
   
   componentDidMount() {
      var map = L.map('map').setView([localStorage.getItem('viDoDiemDi'), localStorage.getItem('kinhDoDiemDi')], 13)

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
         maxZoom: 18,
         id: 'mapbox.streets',
         accessToken: 'pk.eyJ1Ijoic3RpbmdlcnN0IiwiYSI6ImNqd3B2MnRiNjExZDg0NXByZDJtNXNzNnIifQ.ADQOrxvk6JctXY_wLklSHw'
      }).addTo(map);
      var myRouting = L.Routing.control({
         waypoints: [
            L.latLng(localStorage.getItem('viDoDiemDi'), localStorage.getItem('kinhDoDiemDi')),
            L.latLng(localStorage.getItem('viDoDiemDen'), localStorage.getItem('kinhDoDiemDen'))
         ]
         }).addTo(map);
      L.marker([localStorage.getItem('viDoDiemDi'), localStorage.getItem('kinhDoDiemDi')], {icon: diemDi_icon}).addTo(map)
      .bindPopup('Điểm đi')
      L.marker([localStorage.getItem('viDoDiemDen'), localStorage.getItem('kinhDoDiemDen')], {icon: diemDen_icon}).addTo(map)
      .bindPopup('Điểm đến')

      myRouting.on('routesfound', function (e) {
         var khoangCach = e.routes[0].summary.totalDistance;
         console.log('Khoảng cách: ' + khoangCach);
     });
      
   }

   render() {
      
      return (
         <div id="map" style={{"width": "100%", "height": "500px"}} />   
      );
   }
}


export default ChiDuong