const User = require('../models/User')
const bcrypt = require('bcryptjs')


class UserController{
    async registration(req, res){
        try {
            const {email, login, password} = req.body

            const candidate = await User.findOne({email})

            if (candidate) return res.status(400).json({message: `User with email ${email} already exist`})

            const hashPassword = await bcrypt.hash(password, 10)
            
            const user = new User({email, password: hashPassword, login})
            console.log(user)

            await user.save()

            res.json({message: 'User was created'})

        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    }
}


module.exports = new UserController()