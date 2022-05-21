const mongoose = require('mongoose');

const booklistSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number
});

const booklist = mongoose.model('booklist', booklistSchema);


module.export = booklist;