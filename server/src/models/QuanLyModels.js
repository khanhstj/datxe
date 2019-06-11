const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 
const quanLySchema = new Schema({
    tendangnhap: { type: String, required: true, trim: true, unique: true },
    matkhau: { type: String, required: true, trim: true, minlength: 6 },
    hoten: { type: String, required: true }
    
});

var QuanLy = mongoose.model('QuanLy', quanLySchema);
module.exports = QuanLy;