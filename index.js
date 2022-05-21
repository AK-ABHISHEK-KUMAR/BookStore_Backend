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

// const list = [
//     {
//         id: 1,
//         title: "Harry Potter and the Philosopher's Stone",
//         price: 10
//     },
//     {
//         id: 2,
//         title: "Harry Potter and the Chamber of Secrets",
//         price: 15
//     },
//     {
//         id: 3,
//         title: "Harry Potter and the Prisoner of Azkaban",
//         price: 20
//     },
//     {
//         id: 4,
//         title: "Harry Potter and the Goblet of Fire",
//         price: 50
//     },
//     {
//         id: 5,
//         title: "Harry Potter and the Order of the Phoenix",
//         price: 10
//     },
//     {
//         id: 6,
//         title: "Harry Potter and the Half-Blood Prince",
//         price: 30
//     },
//     {
//         id: 7,
//         title: "Harry Potter and the Deathly Hallows",
//         price: 40
//     }
// ]

// let x = 0;

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