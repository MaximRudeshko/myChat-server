const {model, Schema} = require('mongoose')

const Dialog = new Schema({
    avatar: {type: String},
    lastMessage: {type: String},
    /* messages: [{type: Schema.Types.ObjectId, ref : 'Message'}], */
    interlocutor: {type: Schema.Types.ObjectId, ref: 'User', unique: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', unique: true}
})

module.exports = model('Dialog', Dialog)



    