const Router = require('express')
const router = new Router()
const userController = require('../controllers/authController')
const authMidllerware = require('../midllewares/auth.midllerware')


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMidllerware, userController.auth)

module.exports = router

