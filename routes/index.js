const express = require('express')
const cors = require('cors')
const updateLastSeen = require('../midllewares/updateLastSeen')
const Router = require('express')
const dialogsController = require('../controllers/dialogsController')
const messageController = require('../controllers/messageController')
const userController = require('../controllers/userController')
const authMidllerware = require('../midllewares/auth.midllerware')


const userRouter = new Router()
const dialogsRouter = new Router()
const messagesRouter = new Router()

const createRouters = (app, io) => {
    
    app.use(cors())
    app.use(express.json()) 
    app.use(updateLastSeen)
    //Dialogs routes
    dialogsRouter.get('/:id', dialogsController.fetchDialogs(io)) 
    dialogsRouter.post('/create', dialogsController.create(io)) 
    dialogsRouter.delete('/delete/:id', dialogsController.remove(io))

    //Message routes

    messagesRouter.get('/:id', messageController.fetchMessages)
    messagesRouter.post('/create', messageController.create)

    //User routes

    userRouter.post('/registration',userController.registration)
    userRouter.post('/login', userController.login)
    userRouter.get('/auth', authMidllerware, userController.auth)
    userRouter.delete('/remove/:id', authMidllerware, userController.remove)

    app.use('/api/user', userRouter)
    app.use('/api/dialogs', dialogsRouter)
    app.use('/api/messages', messagesRouter)

    
}

module.exports = createRouters