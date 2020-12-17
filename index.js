const express = require('express')
const app = express()
const PORT = process.env.PORT || 3050
const mongoose = require('mongoose')
const dbURL = 'mongodb+srv://maxim:147741@cluster0.l0u0c.mongodb.net/chat?retryWrites=true&w=majority'

const corsMidlleware = require('./midllewares/cors.midlleware')




app.use(corsMidlleware)


const start = async () => {

    mongoose.connect(dbURL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })



    app.listen(PORT, () => {
        console.log(`Server has been started on port ${PORT}`)
    })
}


start()