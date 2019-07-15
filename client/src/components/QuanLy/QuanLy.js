import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import { Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Table } from 'reactstrap'
//import ChuyenDangCho from './QuanLyThongKeChuyen/ChuyenDangCho';
import QuanLyBacTai from './QuanLyBacTai/QuanLyBacTai'
//import ThongKeTheoNgay from './ThongKeTheoNgay/ThongKeTheoNgay';
import { actLuuDanhSachBacTai } from '../../actions/index'
import MenuQuanLy from './MenuQuanLy/MenuQuanLy'
import TableRowChuyenXe from './TableRowChuyenXe'

class QuanLy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDown_thongKe: false,
            state_bangbacTai: false,
            state_thongKeNgay: false,
            capNhatLai: 0,
            dSChuyenXe: [],
        };
        this.DongMoNutThongKe = this.DongMoNutThongKe.bind(this);        
    }

    componentWillMount() {
        this.props.luuDanhSachBacTai()
        axios.get('http://localhost:8797/chuyen-gan-day')
        .then(res => {
            this.setState({
                dSChuyenXe: res.data.result
            })
            
        })
        .catch(err => {
            console.log(err)
        })
    }

    DongMoNutThongKe() {
        this.setState(prevState => ({
            dropDown_thongKe: !prevState.dropDown_thongKe
        }));
    }
    
    Nut_BacTai = () => {
        this.setState({state_bangbacTai: true});
        this.setState({state_thongKeNgay: false});
        this.setState({state_thongKeChuyen: false});
    }

    Nut_ThongKeNgay = () => {
        this.setState({state_thongKeNgay: true});
        this.setState({state_thongKeChuyen: false});
        this.setState({state_bangbacTai: false});
    }

    /*
    QuanLy_Chucnang = () => {
        if(this.state.state_bangbacTai === true) {
            return <QuanLyBacTai/>
        }
        if(this.state.state_thongKeChuyen === true) {
            return <ChuyenDangCho/>
        }
        if(this.state.state_thongKeNgay === true) {
            return <ThongKeTheoNgay/>
        }
    }
    */

    ThongKe_Ngay = () => {
        axios.get('http://localhost:8797/thong-ke-hom-nay')
        .then(res => {
            this.setState({
                dSChuyenXe: res.data.result,
                
            })
        })
    }

    ThongKe_Tuan = () => {
        axios.get('http://localhost:8797/thong-ke-tuan-nay')
        .then(res => {
            this.setState({
                dSChuyenXe: res.data.result,
                
            })
        })
    }

    ThongKe_Thang = () => {
        axios.get('http://localhost:8797/thong-ke-thang-nay')
        .then(res => {
            this.setState({
                dSChuyenXe: res.data.result,
                
            })
        })
    }

    ThongKe_MoiLuc = () => {
        axios.get('http://localhost:8797/thong-ke-moi-luc')
        .then(res => {
            this.setState({
                dSChuyenXe: res.data.result,
                
            })
        })
    }
    render() {

        if(!localStorage.getItem('quanly')) {
            alert('Bạn phải đăng nhập mới có thể vào trang này!!!')
            return <Redirect to='/' />
        }
        else {
            
            return (
                <div>
                    <MenuQuanLy/>
                    
                    <div>
                        <ButtonGroup >
                            <Button onClick={()=> this.Nut_BacTai()} color="success">Danh sách bác tài</Button>{''}
                            <ButtonDropdown isOpen={this.state.dropDown_thongKe} toggle={this.DongMoNutThongKe}>
                                <DropdownToggle color="info" caret>Thống kê chuyến</DropdownToggle>
                                <DropdownMenu>
                                <DropdownItem onClick={() => this.ThongKe_Ngay()}>Hôm nay</DropdownItem>
                                <DropdownItem onClick={() => this.ThongKe_Tuan()}>Tuần này</DropdownItem>
                                <DropdownItem onClick={() => this.ThongKe_Thang()}>Tháng này</DropdownItem>
                                <DropdownItem onClick={() => this.ThongKe_MoiLuc()}>Mọi lúc</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </ButtonGroup>
                    </div>
    
                    {
                        this.state.state_bangbacTai === true ?
                        <QuanLyBacTai />
                        :
                        
                        <Table hover responsive >
                            <thead>
                                <tr align="center"><th colSpan="6"><h4>Chuyến xe gần đây</h4></th></tr>
                                <tr>
                                    <th width="5%">STT</th>
                                    <th width="10%" align="center">Bác tài</th>
                                    <th width="10%">SĐT KH</th>
                                    <th width="30%" align="center">Điểm đi</th>
                                    <th width="30%">Điểm đến</th>
                                    <th width="15%">Thời gian hoàn tất</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.DoDanhSach(this.state.dSChuyenXe)}
                            </tbody>
                        </Table>
                        
                    }
                    
                </div>
            );
        
        
        
        }
        
    }
    DoDanhSach = (danhsach) => {
        if(danhsach.length > 0) {
            const result = danhsach.map((chuyenxe, index) => 
                <TableRowChuyenXe key={index} stt={index} sdtkh={chuyenxe.sdtkh} diemdi={chuyenxe.diemdi} diemden={chuyenxe.diemden} thoigianhoantat={chuyenxe.thoigianhoantat}>{chuyenxe.bactai}</TableRowChuyenXe>
            );
    
            return result;
        }
        else {
            return null
        }
    }
}

const mapStateToProps = state => {
    return {
        danhsachbactai : state.danhsachbactai
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        luuDanhSachBacTai: () => {
            dispatch(actLuuDanhSachBacTai())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuanLy)