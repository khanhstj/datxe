import React, { Component } from 'react';
import {Table} from 'reactstrap';

class ThongKeTheoNgay extends Component {
    render() {
        return (
            <div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ và tên</th>
                            <th>Giới tính</th>
                            <th>Tuổi</th>
                            <th>Số điện thoại</th>
                            <th>Ngày đăng ký</th>
                            <th>Số xe</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <th>Khánh Trần</th>
                            <th>Nam</th>
                            <th>23</th>
                            <th>0333301998</th>
                            <th>31/3/1998</th>
                            <th>59-N2 66666</th>
                        </tr>
                    
                    </tbody>
                </Table>
                
            </div>
        );
    }
}

export default ThongKeTheoNgay;