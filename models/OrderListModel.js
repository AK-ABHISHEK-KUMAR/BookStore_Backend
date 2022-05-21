const mongoose = require('mongoose');

const orderlistSchema = new mongoose.Schema({
    username: String,
    userphone: String,
    useraddress: String,
    bookname: String,
    price: Number
});

const orderlist = mongoose.model('orderlist', orderlistSchema);

module.exports = orderlist;