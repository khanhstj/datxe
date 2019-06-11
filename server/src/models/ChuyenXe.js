const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 
const chuyenxeSchema = new Schema({
   hoten: { type: String, required: true },
   sdt: { type: String, required: true, trim: true, length: 10 },
   trangthai: { type: String, enum: ['Chờ đón khách', 'Đã đón khách', 'Đã hoàn tất'] },
   noidi: {type: String, required: true},
   noiden: {type: String, required: true},
   thoigiandat: {type: Date, default: Date.now},
   thoigianketthuc: {type: Date}
});

var User = mongoose.model('ChuyenXe', chuyenXeSchema);
module.exports = ChuyenXe;