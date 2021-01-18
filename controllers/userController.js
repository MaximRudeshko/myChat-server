const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


class UserController{
    async registration(req, res){
        try {
            const {email, password} = req.body

            console.log(req.body)

            const candidate = await User.findOne({email})

            if (candidate) return res.status(400).json({message: `User with email ${email} already exist`})

            const hashPassword = await bcrypt.hash(password, 10)
            
            const user = new User({email, password: hashPassword})
            

            await user.save()

            res.json({message: 'User was created'})

        } catch (e) {
            console.log(e)
            res.json({message: e})
        }
    }

    async login(req, res){
        try {
            const {email, password} = req.body

            const user = await User.findOne({email})

            if(!user) return res.status(400).json({message: 'User not found'})

            const isPasswordValid = bcrypt.compareSync(password, user.password)

            if(!isPasswordValid) return res.status(400).json({message: 'Invalid password'})

            const token = jwt.sign({id: user._id}, 'secret-key', {expiresIn: '1h'})

            return res.json({token, user})


        } catch (error) {
            console.log(e)
            res.send({message: "Server error"})
        }
    }

    async auth(req, res){
        try {
            const user = await User.findOne({_id: req.user.id})
            
            const token = jwt.sign({id:user._id}, 'secret-key', {expiresIn: '1h'})
            
            return res.json({token, user})
        } catch (error) {
            console.log(error)
            
            return res.status(400).json({message: 'Auth error'})
            
        }
    }

    async remove(req, res){
        try {
            const user = await User.findOne({_id: req.params.id})
            await user.delete()
            res.json({message: `User with id ${req.params.id} was deleted`})
        } catch (error) {
            res.status(404).json({message: 'Server error'})
        }
    }
}


module.exports = new UserController()