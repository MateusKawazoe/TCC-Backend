const user = require('../models/user')

module.exports = {
    async store(req, res) {
        const { 
            foto, 
            usuario, 
            nome, 
            sobrenome,
            idade,
            email,
            endereco
        } = req.body

        const exists = await user.findOne({ usuario })

        if (exists) {
            return res.json("Usuário já cadastrado!")
        }

        const users = await user.create({
            foto: foto, 
            usuario: usuario, 
            nome: nome, 
            sobrenome: sobrenome,
            idade: idade,
            email: email,
            endereco: endereco
        })

        return res.json(users)
    },
}