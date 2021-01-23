const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 3050
const mongoose = require('mongoose')
const createRouters = require('./routes')
const dbURL = 'mongodb+srv://maxim:147741@cluster0.l0u0c.mongodb.net/chat?retryWrites=true&w=majority'


createRouters(app, io)


const start = async () => {

    try {
        await mongoose.connect(dbURL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('TEST', (data) => {
                console.log(data);
            });
        });
            
        http.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}


start()