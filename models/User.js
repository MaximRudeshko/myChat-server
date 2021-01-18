const {Schema, model, ObjectId} = require('mongoose')
const Dialog = require('./Dialog')

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type:String, required: true},
    avatar: {type: String},
    dialogs: [{type: Schema.Types.ObjectId, ref: 'Dialog'}],
    confirmed: {type: Boolean, default: false},
    confirm_hash: {type: String},
    last_seen: {type: Date, default: new Date()}
}, {
    timestamps: true
})


module.exports = model('User', User)