const express = require('express')
const router = express.Router()

const {register, loginBacTai, logoutBacTai, layDanhSachBacTai, khoaKichHoat} = require('../controllers/BacTaiControllers')
const {ThemQuanLy, loginQuanLy, logoutQuanLy} = require('../controllers/QuanLyControllers')
const {BacTaiValidator} = require('../validators/validator')
 
router.post('/them-bac-tai', BacTaiValidator, register)

 
function requiresLogoutBacTai(req, res, next){
    if (req.session && req.session.username) {
        return res.json({err: 'Bạn phải đăng xuất mới có thể đăng nhập'});        
    } else {
        return next();
    }
}
router.post('/bac-tai-dang-nhap', requiresLogoutBacTai, loginBacTai)

function requiresLoginBacTai(req, res, next) {
    //if (req.session) {
        
        
        //return res.json({err: 'You must be đăng nhập to view this page.'});
    //console.log(req)
    return next();
} 
router.post('/bac-tai-dang-xuat', requiresLoginBacTai, logoutBacTai)

//Quản lý
router.post('/them-quan-ly', ThemQuanLy)

function requiresLogoutQuanLy(req, res, next){
    if (req.session && req.session.tendangnhap) {
        return res.json('Bạn phải đăng xuất mới có thể đăng nhập');
    } else {
        return next();
    }
}
router.post('/quan-ly-dang-nhap', requiresLogoutQuanLy, loginQuanLy)

router.post('/danh-sach-bac-tai', layDanhSachBacTai)

router.get('/khoa-kich-hoat', khoaKichHoat)

function requiresLoginQuanLy(req, res, next) {
    //if (req.session) {
        
        
        //return res.json({err: 'You must be đăng nhập to view this page.'});

    return next();
}
router.post('/quan-ly-dang-xuat', requiresLoginQuanLy, logoutQuanLy)

 
module.exports = router;