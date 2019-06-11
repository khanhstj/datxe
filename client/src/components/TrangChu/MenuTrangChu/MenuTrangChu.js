import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {  
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  Col, Form, FormGroup, Label, Input, FormText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Menu_TrangChu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dropdownOpen: false,
            modal_dangKy: false,
            modal_bacTai: false,
            modal_quanLy: false,
            txt_sdtBacTai: '',
            txt_password: '',
            txt_passwordConfirm: '',
            fileChanDung: null,
            fileXe: null,
            txt_hoTen: '',
            txt_soXe: '',
            txt_bactaisdt: '',
            txt_bactaimatkhau: '',
            txt_quanlytaikhoan: '',
            txt_quanlymatkhau: '',
            daDangNhap_quanly: false,
            daDangNhap_bactai: false,
            
        };
        this.toggle_dangNhap = this.toggle_dangNhap.bind(this);
        this.toggle_dangKy = this.toggle_dangKy.bind(this);
        this.toggle_bacTai = this.toggle_bacTai.bind(this);
        this.toggle_quanLy = this.toggle_quanLy.bind(this);
    }
    toggle_dangNhap() { //Để mở dropdown Đăng nhập
        this.setState({
        isOpen: !this.state.isOpen,
        dropdownOpen: !this.state.dropdownOpen
        });    
    }
    toggle_bacTai() { //Đóng mở modal bác tài đăng nhập
        this.setState(prevState => ({
            modal_bacTai: !prevState.modal_bacTai
        }));
    }
    toggle_quanLy() { //Đóng mở modal quản lý đăng nhập
        this.setState(prevState => ({
            modal_quanLy: !prevState.modal_quanLy
        }));
    }
    toggle_dangKy() { //Đóng mở modal đăng ký chạy xe
        this.setState(prevState => ({
            modal_dangKy: !prevState.modal_dangKy
        }));
    }
    quenMatKhau = () => {
        alert('Mật khẩu mất không lấy lại được đâu!!!');
    }
    
    handleSdtChange = (event) => {
        this.setState({txt_sdtBacTai:event.target.value})
    }
    handlePasswordChange = (e) => {
        this.setState({txt_password:e.target.value})
    }
    handlePasswordConfirmChange = (e) =>{
        this.setState({txt_passwordConfirm:e.target.value})
    }
    handleHoTenChange = (e) =>{
        this.setState({txt_hoTen:e.target.value})
    }
    handleSoXeChange = (e) =>{
        this.setState({txt_soXe:e.target.value})
    }
    
    handleAnhChanDungChange = (event) => {
        this.setState({
            fileChanDung: event.target.files[0],
            loaded: 0,
        })
    }
    
    handleAnhXeChange = (event) => {
        this.setState({
            fileXe: event.target.files[0],
            loaded: 0,
        })
    }

        
    submitForm = () => {
        var data = new FormData();
        data.append('fileChanDung', this.state.fileChanDung);
        data.append('fileXe', this.state.fileXe);
        data.append('username', this.state.txt_sdtBacTai);
        data.append('password', this.state.txt_password);
        data.append('password_confirm', this.state.txt_passwordConfirm);
        data.append('hoten', this.state.txt_hoTen);
        data.append('soxe', this.state.txt_soXe);
        axios.post('http://localhost:8797/them-bac-tai', data, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                this.toggle_dangKy();
                //alert('Đăng ký thành công!!!');
            })
            .catch(error => {
                alert(error.response);
            });
        
    }
    //

    //Phần dành cho bác tài đăng nhập
    handleBacTaiSdtChange = (event) => {
        this.setState({txt_bactaisdt: event.target.value});
    }

    handleBacTaiMatKhauChange = (event) => {
        this.setState({txt_bactaimatkhau: event.target.value});
    }
    submitFormBacTaiDangNhap = () => {
        axios.post('http://localhost:8797/bac-tai-dang-nhap', {
            username: this.state.txt_bactaisdt,
            password: this.state.txt_bactaimatkhau,

        })
        .then(res => {
            if(res.data.login === "thành công") {
                localStorage.setItem('bactai', JSON.stringify(res.data.user));
                this.setState({daDangNhap_bactai: true});
            }
            else if (res.data.login === "chưa đăng ký") {
                alert('Số điện thoại này chưa được đăng ký, nếu muốn trở thành bác tài, hãy đăng ký tài khoản')
            }
            else if (res.data.login === "không chính xác") {
                alert('Số điện thoại và mật khẩu không chính xác')
            }
            else {
                console.log(res);
            }
        
        })
        .catch(error => {
            alert(error.response);
        })
    }   
    //

    //Phần dành cho quản lý đăng nhập
    handleQuanLyTenDangNhapChange = (event) => {
        this.setState({txt_quanlytendangnhap: event.target.value});
    }

    handleQuanLyMatKhauChange = (event) => {
        this.setState({txt_quanlymatkhau: event.target.value});
    }
    submitFormQuanLyDangNhap = () => {
        axios.post('http://localhost:8797/quan-ly-dang-nhap', {
            tendangnhap: this.state.txt_quanlytendangnhap,
            matkhau: this.state.txt_quanlymatkhau,

       })
       .then(res => {
            if(res.data.login === "thành công") {
                localStorage.setItem('quanly', JSON.stringify(res.data.quanly));
                this.setState({daDangNhap_quanly: true});
            }
            else if (res.data.login === "chưa đăng ký") {
                alert('Tên đăng nhập này chưa được đăng ký, vui lòng liên hệ quản lý để biết thêm chi tiết')
            }
            else if (res.data.login === "không chính xác") {
                alert('Tên đăng nhập và mật khẩu không chính xác!')
            }
            else {
                console.log(res);
            }
            
       })           
       .catch(error => {
           alert(error.response);
       })
    }

    render() {
        if(this.state.daDangNhap_bactai === true) {
            return (<Redirect to ='/bac-tai' />);
        }
        else if(this.state.daDangNhap_quanly === true) {
            return (<Redirect to ='/quan-ly' />);
        }
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Trang chủ</NavbarBrand>
                    <NavbarToggler //onClick={this.toggle_dangNhap} 
                    />            
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/dat-xe/">Đặt xe</NavLink>
                        </NavItem> 
                        </Nav>
                        <Nav navbar className="ml-left">
                        <NavItem >
                            <NavLink href="#" onClick={this.toggle_dangKy}>Đăng ký chạy xe</NavLink>
                            <Modal isOpen={this.state.modal_dangKy} toggle={this.toggle_dangKy} className="modal-dialog modal-lg" >
                                <ModalHeader toggle={this.toggle_dangKy}>Vui lòng điền đầy đủ thông tin</ModalHeader>
                                <ModalBody>
                                    <Form name="form_dangKyBacTai">
                                        
                                        <FormGroup name="frm_sdt" row>
                                        <Label for="exampleNumber" sm={3}>Số điện thoại</Label>
                                        <Col sm={9}>
                                            <Input type="text" name="txt_sdtBacTai" onChange={(e) => this.handleSdtChange(e)} value={this.state.txt_sdtBacTai} placeholder="Số điện thoại cũng sẽ là tài khoản để đăng nhập" />
                                        </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                        <Label for="examplePassword" sm={3}>Mật khẩu</Label>
                                        <Col sm={9}>
                                            <Input type="password" name="txt_password" onChange={(e) => this.handlePasswordChange(e)} value={this.state.txt_password} id="examplePassword" placeholder="Tạo mật khẩu" />
                                        </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                        <Label for="examplePassword" sm={3}>Nhập lại mật khẩu</Label>
                                        <Col sm={9}>
                                            <Input type="password" name="txt_passwordConfirm" onChange={(e) => this.handlePasswordConfirmChange(e)} value={this.state.txt_passwordConfirm} id="retypePassword" placeholder="Nhập lại mật khẩu" />
                                        </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleNumber" sm={3}>Họ và tên:</Label>
                                            <Col sm={9}>
                                                <Input type="text" name="txt_hoTen" onChange={(e) => this.handleHoTenChange(e)} value={this.state.txt_hoTen} placeholder="Nhập họ và tên" />
                                            </Col>
                                        </FormGroup>
                                                                               
                                        
                                        <FormGroup row>
                                        <Label for="exampleText" sm={3}>Biển số xe</Label>
                                        <Col sm={9}>
                                            <Input type="text" name="txt_soXe" onChange={(e) => this.handleSoXeChange(e)} value={this.state.txt_soXe} placeholder="59N2 12345" />
                                        </Col>                        
                                        
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleFile" sm={3}>Ảnh chân dung</Label>
                                            <Col sm={9}>
                                                <Input type="file" onChange={this.handleAnhChanDungChange} name="file" />
                                                <FormText color="muted">
                                                    Vui lòng chọn ảnh thật của bạn, hiển thị rõ chân dung.
                                                </FormText>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleFile" sm={3}>Ảnh xe</Label>
                                            <Col sm={9}>
                                                <Input type="file" onChange={this.handleAnhXeChange} name="file" />
                                                <FormText color="muted">
                                                    Vui lòng chọn ảnh thể hiện rõ bao quát xe của bạn.
                                                </FormText>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={ () => this.submitForm() }>Xác nhận</Button>
                                    <Button color="secondary" onClick={this.toggle_dangKy}>Hủy</Button>
                                </ModalFooter>
                                </Modal>
                        </NavItem>
                        
                    </Nav>
                    
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle_dangNhap} className="ml-auto" >
                        <DropdownToggle caret>
                            Đăng nhập
                        </DropdownToggle>
                        
                        <DropdownMenu right>        
                            <DropdownItem onClick={ this.toggle_bacTai }>Bác tài</DropdownItem>
                            <Modal isOpen={this.state.modal_bacTai} toggle={this.toggle_bacTai}>
                            <ModalHeader toggle={this.toggle_bacTai} >Bác tài đăng nhập</ModalHeader>
                            <ModalBody>
                            <Form>
                                <FormGroup row >
                                
                                <Col sm={10}>
                                    <Input type="text" name="txt_bactaisdt" onChange={(e)=>this.handleBacTaiSdtChange(e)} placeholder="Số điện thoại" />
                                </Col>
                                </FormGroup>
                                <FormGroup row>                            
                                <Col sm={10}>
                                    <Input type="password" name="txt_bactaimatkhau" onChange={(e)=>this.handleBacTaiMatKhauChange(e)}placeholder="Mật khẩu" />
                                </Col>
                                </FormGroup>
                                </Form>
            
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick = {() => this.submitFormBacTaiDangNhap()}>Đăng nhập</Button>
                                <Button color="secondary" onClick={this.toggle_bacTai}>Hủy</Button>
                            </ModalFooter>
                            </Modal>
                            <DropdownItem onClick={this.toggle_quanLy}>Quản lý</DropdownItem>
                            <Modal isOpen={this.state.modal_quanLy} toggle={this.toggle_quanLy} className={this.props.className}>
                            <ModalHeader toggle={this.toggle_quanLy}>Quản lý đăng nhập</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup row >
                                    
                                    <Col sm={10}>
                                        <Input type="text" name="txt_quanlytendangnhap" onChange={(e)=>this.handleQuanLyTenDangNhapChange(e)} placeholder="Tên đăng nhập" />
                                    </Col>
                                    </FormGroup>
                                    <FormGroup row>                            
                                    <Col sm={10}>
                                        <Input type="password" name="txt_quanlymatkhau" onChange={(e)=>this.handleQuanLyMatKhauChange(e)} placeholder="Mật khẩu" />
                                    </Col>
                                    </FormGroup>
                                </Form>
            
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick = {() => this.submitFormQuanLyDangNhap()}>Đăng nhập</Button>
                                <Button color="secondary" onClick={this.toggle_quanLy}>Hủy</Button>
                            </ModalFooter>
                            </Modal>
                            <DropdownItem divider />
                            <DropdownItem onClick={ this.quenMatKhau }>Quên mật khẩu</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>

                </Navbar>
            
            </div>
        );
    }
}
export default Menu_TrangChu;