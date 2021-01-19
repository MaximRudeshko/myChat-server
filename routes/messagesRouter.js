const Router = require('express')
const messageController = require('../controllers/messageController')
const router = new Router()

router.get('/', messageController.fetchMessages)

module.exports = router