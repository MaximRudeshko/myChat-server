const express = require('express')
const app = express()
const PORT = process.env.PORT || 3050
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/user.route')
const dialogsRouter = require('./routes/dialogs.route')
const dbURL = 'mongodb+srv://maxim:147741@cluster0.l0u0c.mongodb.net/chat?retryWrites=true&w=majority'




app.use(cors())
app.use(express.json()) 
app.use('/api/user', userRouter)
app.use('/api/dialogs', dialogsRouter)

const start = async () => {

    try {
        await mongoose.connect(dbURL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    
    
    
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}


start()