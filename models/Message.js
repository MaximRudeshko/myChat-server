const {model, Schema} = require('mongoose')

const Message = new Schema({
    text: {type: String, required: true},
    dialog: { type: Schema.Types.ObjectId, ref: "Dialog", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    read: {type: Boolean, default: false},
    date: {type: Date, default: new Date()}
})

module.exports = model('Message', Message)