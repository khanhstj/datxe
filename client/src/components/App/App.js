import React from 'react';
//import RouterURL from '../RouterURL/RouterURL';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import QuanLy from '../QuanLy/QuanLy';
import TrangChu from '../TrangChu/TrangChu';
import BacTai from '../BacTai/BacTai'
import DatXe from '../DatXe/DatXe'

//import abc from '../abc'

class App extends React.Component {    
    render() {
        return (
            
            <Router>            
              <Route path="/" exact component={TrangChu} />
              <Route path="/quan-ly" component={QuanLy} />
              <Route path="/bac-tai" component={BacTai} />
              <Route path="/dat-xe" component={DatXe} />
            </Router>

        );
    }
}

export default App;
