import React, { Component } from 'react';
import {Table} from 'reactstrap';
import TableRowBacTai from './TableRowBacTai';
import { connect } from 'react-redux'

class QuanLyBacTai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isUpdated: false,
            //bacTai: [ ]
        }
    }
    
    render() {
        var  { danhsachbactai } = this.props
        if(danhsachbactai.users.length>0) {
            return (
                <Table hover responsive >
                    <thead>
                        <tr align="center"><th colSpan="6"><h4>Danh sách bác tài</h4></th></tr>
                        <tr>
                            <th width="5%">STT</th>
                            <th width="15%" align="center">Số điện thoại</th>
                            <th width="25%">Họ và tên</th>
                            <th width="20%" align="center">Số xe</th>
                            <th width="20%">Trạng thái</th>
                            <th width="15%">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.doDanhSach(danhsachbactai)}
                    </tbody>
                </Table>
            )
        }
        else {
            return <h1>ASUS</h1>
        }
    }

    doDanhSach = (danhsachbactai) => {
        if(danhsachbactai.users.length > 0) {
            const result = danhsachbactai.users.map((bactai, index) => 
                <TableRowBacTai key={index} stt={index} _id={bactai._id} thayDoiTrangThai={this.thayDoiTrangThai} hoten={bactai.hoten} soxe={bactai.soxe} trangthai={bactai.trangthai}>{bactai.username}</TableRowBacTai>
            );
    
            return result;
        }
    }
}

const mapStateToProps = state => {
    return {
        danhsachbactai : state.danhsachbactai
    }
}

export default connect(mapStateToProps)(QuanLyBacTai)