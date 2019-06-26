/*import React from 'react';
//import RouterURL from '../RouterURL/RouterURL';
//import {BrowserRouter as Router, Route} from 'react-router-dom';
import QuanLy from '../QuanLy/QuanLy';
import TrangChu from '../TrangChu/TrangChu';
import BacTai from '../BacTai/BacTai'
import DatXe from '../DatXe/DatXe'
import TestRouting from '../TestRouting';

//import abc from '../abc'

function App() {    
    
    return (
        
        <Router>            
            <Route path="/" exact component={TrangChu} />
            <Route path="/quan-ly" component={QuanLy} />
            <Route path="/bac-tai" component={BacTai} />
            <Route path="/dat-xe" component={DatXe} />
            <Route path="/test" component={TestRouting} />
        </Router>
        
        <div><TestRouting /></div>
        

    );
    
}

export default App;
*/

import React from 'react';

import '../../App.css'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import QuanLy from '../QuanLy/QuanLy';
import TrangChu from '../TrangChu/TrangChu';
import BacTai from '../BacTai/BacTai'
import DatXe from '../DatXe/DatXe'
import TestRouting from '../TestRouting'

function App() {
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

export default App;
