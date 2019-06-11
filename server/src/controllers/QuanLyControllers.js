const bcrypt = require('bcrypt');
const QuanLy = require('../models/QuanLyModels');

exports.ThemQuanLy = function(req, res, next) {
    QuanLy.findOne({tendangnhap: req.body.tendangnhap}, (err, quanly) => {
        if(quanly === null) { //Kiểm tra xem tendangnhap đã được sử dụng chưa
            bcrypt.hash(req.body.matkhau, 10, function(err, hash){ //Mã hóa mật khẩu trước khi lưu vào db
                if (err) { return next(err); }
                const quanly = new QuanLy(req.body)
                quanly.matkhau = hash;
                quanly.matkhau_xacnhan = hash;
                quanly.save((err, result) => {
                    if(err) {return res.json({err})}
                    res.json('Đăng ký thành công')
                })
            })
        } else{
            res.json({err: 'Tên đăng nhập này đã đăng ký trước đó. Vui lòng liên hệ sếp để biết thêm thông tin!'})
        }
    })
}

exports.loginQuanLy = function(req, res) {
    QuanLy.findOne({tendangnhap: req.body.tendangnhap}).exec(function(err, quanly) {
        if(err) {
            return res.json({err})
        }else if (!quanly){
            return res.json({'login': 'chưa đăng ký'})
        }
        bcrypt.compare(req.body.matkhau, quanly.matkhau, (err, result) => {
            if(result === true){
                req.session.quanly = quanly
                req.session.save(err => {
                    if(err) {
                        res.json(err)
                    }
                });
                res.json({
                    quanly: quanly,
                    "login": "thành công"
                })
            }else{
                return res.json({'login': 'không chính xác'})
            }
        })
    })
}

exports.logoutQuanLy = function(req, res){
    //if (req.session.tendangnhap) {
        // delete session object
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
            return res.json({err});
        } 
    });
    return res.json({'logout': "thành công"});
}

