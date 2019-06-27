import React, { Component } from 'react';
import {Table} from 'reactstrap';
import TableRowBacTai from './TableRowBacTai';
import axios from 'axios';
import { connect } from 'react-redux'
import { actLayDanhSachBacTai, actLuuDanhSachBacTai } from './../../../actions/index'

class QuanLyBacTai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isUpdated: false,
            //bacTai: [ ]
        }
    }

    //componentDidMount() {
      //  this.props.luuDanhSachBacTai()
        /*
        axios.post('http://localhost:8797/danh-sach-bac-tai')
            .then(res => {
                this.setState({
                    bacTai: res.data.users,
                    isLoaded: true,
                });
                
            })
            .catch(err => {
                console.log(err);
            })
        */
    //}

    thayDoiTrangThai = (_id, hanhDong) => {
        //this.setState({isLoaded: false});
        axios.get(`http://localhost:8797/khoa-kich-hoat?id=${_id}&hanhdong=${hanhDong}`)
            .then(res => {
                //this.setState({
                    //bacTai: res.data.users,
                    //isUpdated: true
                //});
                
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        var  { danhsachbactai } = this.props
        if(danhsachbactai.users.length>0) {
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
                        {this.show_product(danhsachbactai)}
                    </tbody>
                </Table>
            )
        }
        else {
            return <h1>ASUS</h1>
        }
    }

    show_product = (danhsachbactai) => {
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