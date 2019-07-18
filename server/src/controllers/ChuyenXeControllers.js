const ChuyenXe = require('../models/ChuyenXeModels')

exports.HoanTatChuyen = function (req, res) {
   const chuyenXe = new ChuyenXe()
   chuyenXe.bactai = req.query.bacTai
   chuyenXe.sdtkh = req.query.sdt_KH
   //chuyenXe.hotenkh = req.query.
   chuyenXe.diemdi = req.query.viTriDiemDi_KH
   chuyenXe.diemden = req.query.viTriDiemDen_KH
   let hienTai = new Date()
   chuyenXe.thoigianhoantat = hienTai
   chuyenXe.save((err, result) => {
      if(err) {return res.json({err})}
      res.json({"hoantat": "hoantatchuyenxe"})
  })
}

exports.LayDanhSachChuyenXe = function (req, res) {
   const col = {"_id": 1, "bactai": 1, "sdtkh": 1, "diemdi": 1, "diemden": 1, "thoigianhoantat": 1}
   return find({}, col, (err, chuyenxes) => {
      if(err) {
         return res.json({err})
      }
      else {
         return res.json({chuyenxes})
      }
   })
}

exports.ChuyenGanDay = function (req, res) {
   const col = {"_id": 1, "bactai": 1, "sdtkh": 1, "diemdi": 1, "diemden": 1, "thoigianhoantat": 1}
   return ChuyenXe.find({}, col, (err, result) => {
      if(err) {
         return res.json({err})
      }
      else {
         return res.json({result})
      }
   }).limit(100).sort({thoigianhoantat: -1})
}

exports.ChuyenHomNay = function (req, res) {
   console.log('Thống kê ngày')
   
   let ngay1 = new Date()
   ngay1.setHours(0)
   ngay1.setMinutes(0)
   ngay1.setMilliseconds(1)

   const col = {"_id": 1, "bactai": 1, "sdtkh": 1, "diemdi": 1, "diemden": 1, "thoigianhoantat": 1}
   return ChuyenXe.find({
      thoigianhoantat: {$gte: ngay1},
      
   }, col, (err, result) => {
      if(err) {
         return res.json({err})
      }
      else {
         return res.json({result})
      }
   })
}

exports.ChuyenTuanNay = function (req, res) {
   let ngay = new Date()
   let thu = ngay.getDay() - 1
   let ngayDauTuan = new Date()
   ngayDauTuan.setDate(ngay.getDate() - thu)
   ngayDauTuan.setHours(0)
   ngayDauTuan.setMinutes(0)
   ngayDauTuan.setSeconds(0)
   ngayDauTuan.setMilliseconds(1)
   console.log('Ngày đầu tuần: ' + ngayDauTuan)
   let col = {"_id": 1, "bactai": 1, "sdtkh": 1, "diemdi": 1, "diemden": 1, "thoigianhoantat": 1}
   return ChuyenXe.find({
      thoigianhoantat: {$gte: ngayDauTuan}
   }, col, (err, result) => {
      if (err) {
         return res.json({err})
      }
      else {
         return res.json({result})
      }
   })
}

exports.ChuyenThangNay = function (req, res) {
   let ngayDauThang = new Date()
   ngayDauThang.setDate(1)
   ngayDauThang.setHours(0)
   ngayDauThang.setMinutes(0)
   ngayDauThang.setSeconds(0)
   ngayDauThang.setMilliseconds(1)
   let col = {"_id": 1, "bactai": 1, "sdtkh": 1, "diemdi": 1, "diemden": 1, "thoigianhoantat": 1}
   return ChuyenXe.find({
      thoigianhoantat: {$gte: ngayDauThang}
   }, col, (err, result) => {
      if (err) {
         return res.json({err})
      }
      else {
         return res.json({result})
      }
   })

   
}

exports.ChuyenTatCa = function (req, res) {
   const col = {"_id": 1, "bactai": 1, "sdtkh": 1, "diemdi": 1, "diemden": 1, "thoigianhoantat": 1}
   return ChuyenXe.find({}, col, (err, result) => {
      if(err) {
         return res.json({err})
      }
      else {
         return res.json({result})
      }
   }).sort({thoigianhoantat: -1})
}