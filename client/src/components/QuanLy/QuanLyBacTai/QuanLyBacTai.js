import React, { Component } from 'react';
import {Table} from 'reactstrap';
import TableRowBacTai from './TableRowBacTai';
import axios from 'axios';

class QuanLyBacTai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isUpdated: false,
            BacTais: [ ]
        }
    }

    componentWillMount() {
        axios.post('http://localhost:8797/danh-sach-bac-tai')
            .then(res => {
                this.setState({
                    BacTais: res.data.users,
                    isLoaded: true,
                });
                
            })
            .catch(err => {
                console.log(err);
            })
    }

    content() {      
        return (
            <Table hover responsive >
                <thead>
                    <tr><th colSpan="5"><h4>Danh sách bác tài</h4></th></tr>
                    <tr>
                        <th xs="1">STT</th>
                        <th xs="2">Số điện thoại</th>
                        <th xs="3">Họ và tên</th>
                        <th xs="2">Số xe</th>
                        <th xs="2">Trạng thái</th>
                        <th xs="2">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {this.show_product()}
                </tbody>
            </Table>) 
    }
    
    thayDoiTrangThai = (_id, hanhDong) => {
        //this.setState({isLoaded: false});
        axios.get(`http://localhost:8797/khoa-kich-hoat?id=${_id}&hanhdong=${hanhDong}`)
            .then(res => {
                //this.setState({
                    //BacTais: res.data.users,
                    //isUpdated: true
                //});
                
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        return (
            <div>                 
                {this.state.isLoaded ? this.content() : null}
            </div>
        );
    }

    show_product = () => {
        if(this.state.BacTais.length > 0) {
            const result = this.state.BacTais.map((bactai, index) => 
                <TableRowBacTai key={index} stt={index} _id={bactai._id} thayDoiTrangThai={this.thayDoiTrangThai} hoten={bactai.hoten} soxe={bactai.soxe} trangthai={bactai.trangthai}>{bactai.username}</TableRowBacTai>
            );
    
            return result;
        }
    }
}

export default QuanLyBacTai;