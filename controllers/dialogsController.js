const Dialog = require("../models/Dialog")
const Message = require("../models/Message")
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
            const {text, owner, interlocutor} = req.body
            const dialog = new Dialog({
                owner,
                interlocutor,
                lastMessage: text
            })
            await dialog.save()

            const message = new Message({
                text: req.body.text,
                user: req.body.owner,
                dialog: dialog._id
            })

            await message.save()
                
            
            
            res.json(dialog)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Dialog create error'})
        }

    }


    async remove(req, res){
        try {
            await Dialog.findByIdAndDelete(req.params.id)
            return res.json({message: `User with id ${req.params.id} was deleted`})
                
        } catch (error) {
            res.status(404).json({message: 'Server error'})
        }
    }

}


module.exports = new DialogsController()