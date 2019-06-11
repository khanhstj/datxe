import React, { Component } from 'react';
import MenuQuanLy from './MenuQuanLy/MenuQuanLy';
import { Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ChuyenDangCho from './QuanLyThongKeChuyen/ChuyenDangCho';
import QuanLyBacTai from './QuanLyBacTai/QuanLyBacTai';
import ThongKeTheoNgay from './ThongKeTheoNgay/ThongKeTheoNgay';
import {Redirect} from 'react-router-dom';

class QuanLy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDown_thongKe: false,
            state_bangbacTai: false,
            state_thongKeNgay: false,
            state_thongKeChuyen: true,
        };
        this.DongMoNutThongKe = this.DongMoNutThongKe.bind(this);        
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
                                <DropdownItem onClick={() => this.Nut_ThongKeNgay()}>Theo ngày</DropdownItem>
                                <DropdownItem>Theo tuần</DropdownItem>
                                <DropdownItem>Theo tháng</DropdownItem>
                                <DropdownItem>Tất cả</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </ButtonGroup>
                    </div>
    
                    <div>
                        { this.QuanLy_Chucnang() }                
                    </div>
                </div>
            );
        
        
        
        }
        
    }
}

export default QuanLy;