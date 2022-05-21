const mongoose = require('mongoose');

const userlistSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    address: String
});

const userlist = mongoose.model('userlist', userlistSchema);

module.exports = userlist;