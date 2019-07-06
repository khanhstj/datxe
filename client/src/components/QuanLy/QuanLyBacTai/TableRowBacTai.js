import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import axios from 'axios'

class TableRowBacTai extends Component {
    constructor (props) {
        super(props);
        this.state = {
            trangthai: this.props.trangthai,
        }
    }
    /*
    thayDoiTrangThai = (_id, hanhDong) => {
        this.props.thayDoiTrangThai(_id, hanhDong);
        if(hanhDong === "kichhoat") {
            this.setState({trangthai: "Đã kích hoạt"})
        }
        if(hanhDong === "khoa") {
            this.setState({trangthai: "Đã khóa"})
        }
    }
    */
   thayDoiTrangThai = (_id, hanhDong) => {
       if(hanhDong==='kichhoat') {
           this.setState({
               trangthai: 'Đã kích hoạt'
           })
           axios.get(`http://localhost:8797/khoa-kich-hoat?id=${_id}&hanhdong=kichhoat`)
            
       }
       else if(hanhDong === 'khoa'){
           this.setState({
               trangthai: 'Đã khóa'
           })
           axios.get(`http://localhost:8797/khoa-kich-hoat?id=${_id}&hanhdong=khoa`)
       }
   }

    ChucNang() {
        if(this.state.trangthai === "Chưa kích hoạt") {
            return <Badge className="badges" color="success" onClick={ () => this.thayDoiTrangThai(this.props._id, "kichhoat") }>Kích hoạt</Badge>
        }
        else if (this.state.trangthai === "Đã khóa") {
            return <Badge className="badges" color="warning" onClick={ () => this.thayDoiTrangThai(this.props._id, "kichhoat") }>Kích hoạt lại</Badge>
        }
        else {
            return <Badge className="badges" color="danger" onClick={ () => this.thayDoiTrangThai(this.props._id, "khoa") }>Khóa</Badge>
        }
    }

    render() {
        
        return (
            <tr>
                <th scope="row">{this.props.stt}</th>
                <th>{this.props.children}</th>
                <th>{this.props.hoten}</th>
                <th>{this.props.soxe}</th>
                <th>{this.state.trangthai}</th>
                <th>{this.ChucNang()}</th>
            </tr>
        );
    }
}

export default TableRowBacTai;