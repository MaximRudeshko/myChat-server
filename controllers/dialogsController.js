const Dialog = require("../models/Dialog")
const User = require("../models/User")


class DialogsController{
    async fetchDialogs(req, res){
        try {
            console.log(req.params.id)
            const dialogs = await Dialog.find({owner: req.params.id})
                .populate(['owner', 'interlocutor'])
            res.json(dialogs)
        } catch (error) {
            res.status(404).json({message: 'Not found'})
        }
    }

    async create(req, res){
        try {
            console.log(req.body)
            const dialog = new Dialog(req.body)
            await dialog.save()
            res.json(dialog)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Dialog create error'})
        }

    }

}


module.exports = new DialogsController()