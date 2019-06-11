const bcrypt = require('bcrypt');
//const saltRounds = 10;
const User = require('../models/BacTaiModels')

exports.register = function(req, res, next){    
    User.findOne({username: req.body.username}, (err, user) => {
        if(user == null) { //Kiểm tra xem user đã được sử dụng chưa      
           
            bcrypt.hash(req.body.password, 10, function(err, hash){ //Mã hóa mật khẩu trước khi lưu vào db
                if (err) {return next(err);}
                
                //Lưu file ảnh chân dung vào ổ cứng
                let imageChanDung = req.files.fileChanDung;
                imageChanDung.mv(`C:/Users/khanh/Desktop/DoAn/server/public/ChanDung/${req.body.username}.jpg`, function(err) {
                    if(err) {
                        return res.status(500).send(err);
                    }
                    
                });

                let imageXe = req.files.fileXe;
                imageXe.mv(`C:/Users/khanh/Desktop/DoAn/server/public/Xe/${req.body.username}.jpg`, function(err) {
                    if(err) {
                        return res.status(500).send(err);
                    }
                    
                });

                const user = new User(req.body)
                user.trangthai = 'Chưa kích hoạt' //sau khi đăng ký thì trạng thái mặc định là chưa kích hoạt
                user.password = hash;
                user.password_confirm = hash;
                user.anhchandung = `C:/Users/khanh/Desktop/DoAn/server/public/ChanDung/${req.body.username}.jpg`;
                user.anhxe = `C:/Users/khanh/Desktop/DoAn/server/public/Xe/${req.body.username}.jpg`;
                
                user.save((err, result) => {
                    if(err) {return res.json({err})}
                    res.json('Đăng ký thành công')
                })
            })
        } else{
            res.json({err: 'Số điện thoại này đã đăng ký trước đó.'})
        }        
    })
}

exports.loginBacTai = function(req, res){
    User.findOne({username: req.body.username}).exec(function(err, user){
        if(err) {
            return res.json({err})
        }else if (!user){
            return res.json({'login': 'chưa đăng ký'}) 
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(result === true){
                req.session.user = user
                req.session.save(err => {
                    if(err) {
                        res.json(err)
                    }
                });
                res.json({
                    user: user,
                    "login": "thành công"
                })
            }else{
                return res.json({'login': 'không chính xác'})
            }
        })
    })
}

exports.logoutBacTai = function(req, res){
    req.session.destroy(function(err) {
        if(err) {
            console.log(err)
            return res.json({err})
        }
    });
    return res.json({"logout": "thành công"});
    
}

exports.layDanhSachBacTai = (req, res) => {
    const col = {"_id": 1, "username": 1, "hoten": 1, "soxe": 1, "trangthai": 1}
    return User.find({}, col, (err, users) => {
        if(err) {return res.json({err})}
        res.json({users: users})
    })
}

exports.khoaKichHoat = (req, res) => {
    //console.log(req.query);
    const col = {"_id": 1, "username": 1, "hoten": 1, "soxe": 1, "trangthai": 1}
    User.findById(req.query.id).exec(function(err, user) {
        if(err) {
            return res.json({err});
        }
        if(req.query.hanhdong === "khoa") {
            user.trangthai = "Đã khóa"
            user.save().then(result => {
                return User.find({}, col, (err, users) => {
                    if(err) {return res.json({err})}
                    res.json({users: users})
                })
            })
        }
        if(req.query.hanhdong === "kichhoat") {
            user.trangthai = "Đã kích hoạt"
            user.save().then(result => {
                return User.find({}, col, (err, users) => {
                    if(err) {return res.json({err})}
                    res.json({users: users})
                })
            })
        }
    })
}