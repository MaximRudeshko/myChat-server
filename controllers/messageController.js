const Message = require("../models/Message");

class messageController{
    async fetchMessages(req, res){
        const messages = await Message.find({_id: req.params.id})
        res.json({messages})
    }
}

module.exports = new messageController()