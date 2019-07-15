import React, { Component } from 'react';

class TableRowChuyenXe extends Component {
   render() {
      return (
         <tr>
            <th scope="row">{this.props.stt}</th>
            <th>{this.props.children}</th>
            <th>{this.props.sdtkh}</th>
            <th>{this.props.diemdi}</th>
            <th>{this.props.diemden}</th>
            <th>{this.props.thoigianhoantat}</th>
               
         </tr>
      );
   }
}

export default TableRowChuyenXe;