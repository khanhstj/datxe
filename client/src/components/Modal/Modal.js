import React, { Component } from 'react';

class Modal extends Component {
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog modal-lg" >
                <ModalHeader toggle={this.toggle}>Vui lòng điền đầy đủ thông tin</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label for="exampleNumber" sm={3}>Họ và tên:</Label>
                            <Col sm={9}>
                                <Input type="text" name="text" id="hoVaTen" placeholder="Nhập họ và tên" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                        <Label for="exampleNumber" sm={3}>Số điện thoại</Label>
                        <Col sm={9}>
                            <Input type="text" name="text" id="exampleNumber" placeholder="" />
                        </Col>
                        </FormGroup>
                        <FormGroup row>
                        <Label for="examplePassword" sm={3}>Mật khẩu</Label>
                        <Col sm={9}>
                            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                        </Col>
                        </FormGroup>
                        <FormGroup row>
                        <Label for="examplePassword" sm={3}>Nhập lại mật khẩu</Label>
                        <Col sm={9}>
                            <Input type="password" name="password" id="retypePassword" placeholder="password placeholder" />
                        </Col>
                        </FormGroup>
                        <FormGroup row>
                        <Label for="exampleSelect" sm={3}>Năm sinh</Label>
                        <Col sm={9}>
                            <Input type="select" name="select" id="exampleSelect" >
                                <option>1960</option>
                                <option>1998</option>
                                <option>2001</option>
                            </Input>
                        </Col>
                        </FormGroup>
                        
                        <FormGroup row>
                        <Label for="exampleText" sm={3}>Biển số xe</Label>
                        <Col sm={4}>
                            <Input type="text" name="text" id="bienKiemSoat" placeholder="59-N2" />
                        </Col>                        
                        <Col sm={5}>
                            <Input type="text" name="text" id="bienKiemSoat" placeholder="333.46" />
                        </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleFile" sm={3}>Ảnh chân dung</Label>
                            <Col sm={9}>
                                <Input type="file" name="file" id="exampleFile" />
                                <FormText color="muted">
                                    Vui lòng chọn ảnh thật của bạn, hiển thị rõ chân dung.
                                </FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleFile" sm={3}>Ảnh xe</Label>
                            <Col sm={9}>
                                <Input type="file" name="file" id="exampleFile" />
                                <FormText color="muted">
                                    Vui lòng chọn ảnh thể hiện rõ bao quát xe của bạn.
                                </FormText>
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Xác nhận</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Modal;