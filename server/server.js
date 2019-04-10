const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socket = require('socket.io');
const bodyparser = require('body-parser')
const Chat = require('./model/model');
const api = require('./routes/api')

// invoking express method
const app = express();

// invoking cors to handle cors requests
app.use(cors());

// use body parser for the form data
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

// routes from separate file
app.use('/users',api)

// middleware for static content
app.use(express.static('public'))

//mongodb connection url
const dbUrl = "mongodb://localhost:27017/chats"

const server = app.listen('8000', () => {
    console.log("Listening at post 8000....")
});

// connect to mongodb
mongoose.connect(dbUrl, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("successfully connected to the db..")
    }
})

// open socket connection on server
const io = socket(server);

    io.on('connection', (socket) => {
    console.log('listening to the connection...', socket.id)

    socket.on('chat', function (data) {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data)
    })
})




