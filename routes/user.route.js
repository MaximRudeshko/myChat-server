const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMidllerware = require('../midllewares/auth.midllerware')


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMidllerware, userController.auth)
router.delete('/remove/:id', authMidllerware, userController.remove)

module.exports = router

