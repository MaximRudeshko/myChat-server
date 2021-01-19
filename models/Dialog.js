const {model, Schema} = require('mongoose')

const Dialog = new Schema({
    avatar: {type: String},
    lastMessage: {type: String, required: true},
    /* messages: [{type: Schema.Types.ObjectId, ref : 'Message'}], */
    interlocutor: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = model('Dialog', Dialog)



    