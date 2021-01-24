const Dialog = require("../models/Dialog");
const Message = require("../models/Message");

class messageController{
    async fetchMessages(req, res){
        try {
            const dialog = req.params.id
            const messages = await Message.find({dialog}).populate(['user'])
            res.json(messages)
        } catch (error) {
            res.status(404).json({message: 'messages not found'})
        }
    }

    create (io)  {
        return async (req, res) => {
            try {
                const {dialog, text, user} = req.body
                console.log(dialog)
                await Dialog.findByIdAndUpdate(dialog, {lastMessageTime : new Date(), lastMessage: text})
                   
                const messageData = {
                    text,
                    dialog,
                    user
                }

                const message = new Message(messageData)
                await message.save()
                message.populate(
                    ['user'],
                    (e, msg) => {
                        if(e){
                            res.json({message: "error"})
                        }
                        res.json(msg)
                        io.emit('NEW_MESSAGE', msg)
                    }
                )    
                
            } catch (error) {
                console.log(error)
                res.status(400).json({message: 'Message send error'})
            }
        }
        
    }
}

module.exports = new messageController()