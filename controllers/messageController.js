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

     async create (req, res)  {
       
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

        res.json(message)
        
    }
}

module.exports = new messageController()