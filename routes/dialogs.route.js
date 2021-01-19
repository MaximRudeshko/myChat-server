const Router = require('express')
const router = new Router()
const dialogsController = require('../controllers/dialogsController')

router.get('/:id', dialogsController.fetchDialogs) 
router.post('/create', dialogsController.create) 
router.delete('/delete/:id', dialogsController.remove)


module.exports = router