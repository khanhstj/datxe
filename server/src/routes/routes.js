const express = require('express')
const router = express.Router()

const {register, loginBacTai, logoutBacTai, layDanhSachBacTai, khoaKichHoat} = require('../controllers/BacTaiControllers')
const {ThemQuanLy, loginQuanLy, logoutQuanLy} = require('../controllers/QuanLyControllers')
const { HoanTatChuyen, ChuyenGanDay, ChuyenHomNay, ChuyenTuanNay, ChuyenThangNay, ChuyenTatCa } = require('../controllers/ChuyenXeControllers')
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

router.get('/hoan-tat-chuyen', HoanTatChuyen)

function requiresLoginQuanLy(req, res, next) {
    //if (req.session) {
        
        
        //return res.json({err: 'You must be đăng nhập to view this page.'});

    return next();
}
router.post('/quan-ly-dang-xuat', requiresLoginQuanLy, logoutQuanLy)

router.get('/chuyen-gan-day', ChuyenGanDay)

router.get('/thong-ke-hom-nay', ChuyenHomNay)

router.get('/thong-ke-tuan-nay', ChuyenTuanNay)

router.get('/thong-ke-thang-nay', ChuyenThangNay)

router.get('/thong-ke-moi-luc', ChuyenTatCa)

module.exports = router;