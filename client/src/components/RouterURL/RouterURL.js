import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TestRouting from '../TestRouting';
import TrangChu from '../TrangChu/TrangChu'
import BacTai from '../BacTai/BacTai'
import DatXe from '../DatXe/DatXe'
import QuanLy from '../QuanLy/QuanLy'

class RouterURL extends Component {
   render() {
      return (
         <div>
            <Router>            
               <Route path="/" exact component={TrangChu} />
               <Route path="/quan-ly" component={QuanLy} />
               <Route path="/bac-tai" component={BacTai} />
               <Route path="/dat-xe" component={DatXe} />
               <Route path="/test" component={TestRouting} />
            </Router>
         </div>
      );
   }
}

export default RouterURL;