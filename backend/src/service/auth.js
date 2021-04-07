const jwt = require('jsonwebtoken')
require('dotenv/config')

exports.generateToken = async (data) => {
    return jwt.sign(data, process.env.SALT_KEY, {
        expiresIn: '1d'
    })
}

exports.decodeToken = async (token) => {
    return await jwt.verify(token, process.env.SALT_KEY)
}

exports.authorize = function (req, res, next) {
    var token = req.body.token

    if (!token) {
        res.status(401).json({
            message: 'Acesso restrito!'
        })
    } else {
        jwt.verify(token, process.env.SALT_KEY, function (error) {
            if (error) {
                res.status(401).json({
                    message: 'Token inválido!'
                })
            } else {
                next()
            }
        })
    }
}