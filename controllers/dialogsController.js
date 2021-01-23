const Dialog = require("../models/Dialog")


class DialogsController{
    fetchDialogs(io){
        try {
            return async function (req, res){
                
                const dialogs = await Dialog
                    .find({$or : [{owner: req.params.id}, {interlocutor: req.params.id}]})
                    .populate(['owner', 'interlocutor'])
                io.emit('FETCH_DIALOGS', dialogs)
                res.json(dialogs)
        }
        } catch (error) {
            res.status(404).json({message: 'Not found'})
        }
    }

    create(io){
        return async function(req, res){
            try {
                const {text, owner, interlocutor} = req.body
                console.log(req.body)
                const dialog = new Dialog({
                    owner,
                    interlocutor,
                    lastMessage: text,
                    lastMessageTime: new Date()
                })
                await dialog.save()
    
                const message = new Message({
                    text, 
                    user: owner,
                    dialog: dialog._id
                })
    
                await message.save()
                    
                
                
                res.json(dialog)
            } catch (error) {
                console.log(error)
                res.status(400).json({message: 'Dialog create error'})
            }
        }
    }


    remove(io){
        return async function(req, res){
            try {
                await Dialog.findByIdAndDelete(req.params.id)
                return res.json({message: `User with id ${req.params.id} was deleted`})
                    
            } catch (error) {
                res.status(404).json({message: 'Server error'})
            }
        }
    }

}


module.exports = new DialogsController()