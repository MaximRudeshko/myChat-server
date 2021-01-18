const {model, Schema} = require('mongoose')

const Message = new Schema({
    text: {type: String},
    dialog: { type: Schema.Types.ObjectId, ref: "Dialog", require: true },
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    read: {type: Boolean, default: false},
    date: {type: Date, default: new Date()}
})

module.exports = model('Message', Message)