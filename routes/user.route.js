const Router = require('express')
const router = new Router()
const userController = require('../controllers/authController')


router.post('/registration', userController.registration)



module.exports = router