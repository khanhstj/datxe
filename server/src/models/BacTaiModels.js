const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 
const userSchema = new Schema({
    username: { type: String, required: true, trim: true, length: 10 },
    trangthai: { type: String, enum: ['Chưa kích hoạt', 'Đã kích hoạt', 'Đã khóa'] },
    password: { type: String, required: true, trim: true, minlength: 6 },
    hoten: { type: String, required: true },
    anhchandung: { type: String, required: true },
    anhxe: { type:String, required: true },
    soxe: { type:String, required: true }
});

var User = mongoose.model('User', userSchema);
module.exports = User;