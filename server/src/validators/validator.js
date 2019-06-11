const BacTai = require('../models/BacTaiModels')
 
exports.BacTaiValidator = function(req, res, next){
       
    req.check('username', 'Số điện thoại không hợp lệ.').isString();
    req.check('username', 'Vui lòng nhập số điện thoại.').notEmpty();    
    req.check('username', 'Số điện thoại có 10 chữ số').isLength(10);
    req.check('password', 'Vui lòng nhập mật khẩu.').notEmpty();
    req.check('password', 'Mật khẩu phải dài hơn 6 ký tự').isLength({min:6});
    req.check('password_confirm', 'Vui lòng nhập mật khẩu xác nhận.').notEmpty();
    req.check('password_confirm','Mật khẩu xác nhận không trùng khớp.').equals(req.body.password);
    req.check('hoten', 'Họ tên không hợp lệ.').isString();
    req.check('hoten', 'Vui lòng nhập họ tên của bạn').notEmpty();
    //req.check('anhchandung', 'Vui lòng chọn ảnh chân dung của bạn').notEmpty();
    //req.check('anhxe', 'Vui lòng tải lên ảnh xe của bạn').notEmpty();
    req.check('soxe', 'Vui lòng nhập số xe').notEmpty();
 
    //check for errors
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
}