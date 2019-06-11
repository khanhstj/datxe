import React, { Component } from 'react';
import {Table} from 'reactstrap';

class ChuyenDangCho extends Component {
    
    render() {
        
        return (
            <div>
                <Table striped>
                    <thead>
                        <tr>
                            <th colSpan="6"><h4>Danh sách chuyến đang chờ xác nhận</h4></th>
                        </tr>
                        <tr>
                            <th>STT</th>
                            <th>Khách hàng</th>
                            <th>SĐT khách hàng</th>
                            <th>Thời gian đặt xe</th>
                            <th>Vị trí</th>
                            <th>Điểm đến</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                    </tbody>
                </Table>
                
            </div>
        );
    }
}

export default ChuyenDangCho;