const {model, Schema} = require('mongoose')

const Dialog = new Schema({
    avatar: {type: String},
    lastMessage: {type: String, required: true},
    interlocutor: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    lastMessageTime: {type: Date}
})

module.exports = model('Dialog', Dialog)



    