const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 
const chuyenXeSchema = new Schema({
   bactai: { type: String, required: true },
   sdtkh: { type: String, required: true},
   
   diemdi: {type: String, required: true},
   diemden: {type: String, required: true},
   thoigianhoantat: {type: Date}
});

var ChuyenXe = mongoose.model('ChuyenXe', chuyenXeSchema);
module.exports = ChuyenXe;