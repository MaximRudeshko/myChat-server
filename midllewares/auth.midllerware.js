const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)

        if(!token) return res.status(401).json({message: 'Auth error'})

        const decoded = jwt.verify(token, 'secret-key')

        req.user = decoded

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({message: 'Auth error'})
    }
}