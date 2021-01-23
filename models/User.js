const {Schema, model} = require('mongoose')


const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type:String, required: true},
    userName: {type: String, required: true},
    avatar: {type: String},
    confirmed: {type: Boolean, default: false},
    confirm_hash: {type: String},
    last_seen: {type: Date, default: new Date()}
}, {
    timestamps: true
})


module.exports = model('User', User)