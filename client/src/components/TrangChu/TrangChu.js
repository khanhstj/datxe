import React, { Component } from 'react';
import MenuTrangChu from './MenuTrangChu/MenuTrangChu';
import NoiDungTrangChu from './NoiDungTrangChu/NoiDungTrangChu'

class TrangChu extends Component {

    render() {
        return (
            <div>
                <MenuTrangChu/>
                <NoiDungTrangChu/>
                
            </div>
        );
    }
}

export default TrangChu;