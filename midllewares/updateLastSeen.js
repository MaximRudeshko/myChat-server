const User = require("../models/User")

module.exports = async (req, res, next) => {
    await User
        .updateOne({_id: '60055095eb5577567c953a9c'},
        {last_seen: new Date()})
    next()
}