const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMidllerware = require('../midllewares/auth.midllerware')

const { body} = require('express-validator');


router.post('/registration',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 5 })
    ],
userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMidllerware, userController.auth)
router.delete('/remove/:id', authMidllerware, userController.remove)

module.exports = router

