const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bookslist = require('./models/BookListModel');
const userlist = require('./models/UserListModel');
const orderlist = require('./models/OrderListModel');
const cors = require('cors');
let db = null;

app.use(express.json());
app.use(cors());


app.post('/users', async (req, res) => {

    const userName = req.body.name;
    const userPhone = req.body.phone;
    const userAddress = req.body.address;

    const user = new userlist({
        name: userName,
        phone: userPhone,
        address: userAddress
    });
    await user.save().then(result => {
        console.log(result);
    }).catch(err => {
        res.send(err);
    });
});

app.post('/orderData', async (req, res) => {
    const userName = req.body.name;
    const userPhone = req.body.phone;
    const userAddress = req.body.address;
    const bookName = req.body.bookName;
    const bookPrice = parseInt(req.body.bookPrice.split(' ')[1]);

    const order = new orderlist({
        username: userName,
        userphone: userPhone,
        useraddress: userAddress,
        bookname: bookName,
        price: bookPrice
    });
    await order.save().then(result => {
        console.log(result);
    }).catch(err => {
        res.send(err);
    });
});


app.get("/bookslist", async (req, res) => {
    db.collection('booklists').find({}).toArray(function (err, result) {
        if (err) console.log(err);
        res.send(result);
    });
});


mongoose.connect('mongodb://localhost/BookStore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connected');
    db = mongoose.connection
}).catch(err => {
    console.log(err);
});

app.listen(3001, () => {
    console.log('Server started at port 3001');
});