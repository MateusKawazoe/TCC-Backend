const user = require('../models/user')
const auth_token = require('../services/auth')
const md5 = require("md5")

module.exports = {
    async store(req, res) {
        const {
            foto,
            usuario,
            senha,
            nome,
            localizacao
        } = req.body

        const userExists = await user.findOne({ usuario })
        const nameExists = await user.findOne({ nome })

        if (userExists || nameExists) {
            return res.json("Usuário já cadastrado!")
        }

        const token = await auth_token.generateToken({
            usuario,
            senha
        })

        const users = await user.create({
            foto: foto,
            usuario: usuario,
            senha: md5(senha + global.SALT_KEY),
            nome: nome,
            localizacao: localizacao,
            integridade: 1,
            nivel: {
                lvl: 0,
                xp: 0
            }
        })

        return res.json(users)
    },

    async showAll(req, res) {
        return res.json(await user.find())
    },

    async showOne(req, res) {
        const usuario = req.headers.usuario
        const exists = await user.findOne({ usuario })

        if (exists) {
            return res.json(exists)
        }

        return res.json('Usuário não existe!')
    },

    async usersNumber(req, res) {
        return res.json('Existem ' + (await user.find()).length + ' usuários cadastrados no momentos!')
    },

    async delete(req, res) {
        const usuario = req.headers.usuario
        const exists = await user.findOne({ usuario })

        if (exists) {
            await user.deleteOne({ usuario })

            return res.json('Usuário deletado com sucesso!')
        }

        return res.json('Usuário não existe!')
    },

    async update(req, res) {
        const { foto, usuario } = req.body

        var exists = await user.findOne({ usuario })

        if (exists) {
            await user.updateOne(
                { usuario },
                { $set: { foto: foto } },
                { $upsert: false }
            )

            return res.json('Usuário atualizado com sucesso!\n\n' + exists)
        }

        exists = await user.findOne({ usuario })
        return res.json('Usuário não existe!')
    }
}