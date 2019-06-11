import React, { Component } from 'react';
import {Table} from 'reactstrap';

class QuanLyThongKe extends Component {
    render() {
        return (
            <div>
                <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Số điện thoại</th>
            <th>Tên khách hàng</th>
            <th>Vị trí</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
            </div>
        );
    }
}

export default QuanLyThongKe;