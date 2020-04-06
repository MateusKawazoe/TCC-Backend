const crop = require('../models/crop')
const user = require('../models/user')

module.exports = {
    async store(req, res) {
        const {
            nome,
            dono,
            participantes,
            localizacao
        } = req.body

        const cropExists = await crop.findOne({ dono })
        const userExists = await user.findOne({ username: dono })

        if (cropExists) {
            if (cropExists.nome == nome) {
                return res.json("Nome da horta já foi utilizada!")
            }
            if (cropExists.localizacao.endereco.rua == localizacao.endereco.rua &&
                cropExists.localizacao.endereco.numero == localizacao.endereco.numero) {
                return res.json("Horta já cadastrado!")
            } else if (userExists) {
                if (userExists.horta.length > 2)
                    return res.json("Você atingiu o número máximo de hortas!")
            }
        }

        const crops = await crop.create({
            nome: nome,
            dono: dono,
            participantes: [participantes],
            localizacao: localizacao,
            nivel: {
                lvl: 0,
                xp: 0
            }
        })

        await user.updateOne(
            { usuario: dono },
            { $addToSet: { horta: crops.nome } }
        )

        return res.json(await user.findOne({ usuario: dono }))
    },

    async showAll(req, res) {
        const { nome, dono, localizacao, lvl, participante } = req.body
        return res.json(await crop.find({
            nome: nome
        }))
    },

    async showOne(req, res) {
        const { dono, nome } = req.body
        const exists = await crop.findOne({ dono, nome })

        if (exists) {
            return res.json(exists)
        }

        return res.json('Horta não existe!')
    },

    async cropsNumber(req, res) {
        return res.json('Existem ' + (await crop.find()).length + ' hortas cadastradas no momentos!')
    },

    async delete(req, res) {
        const { dono, nome } = req.body
        const exists = await crop.findOne({ dono, nome })

        if (exists) {
            await crop.deleteOne({ dono, nome })
            await user.updateOne(
                { usuario: dono },
                { $pull: { horta: nome } }
            )
            return res.json('Horta deletado com sucesso!')
        }

        return res.json('Horta não existe!')
    },

    async insertUser(req, res) {
        const { dono, nome, usuario } = req.body

        const exists = await crop.findOne({ dono, nome })
        const participantExists = await crop.findOne({ participantes: usuario })

        if (participantExists) {
            return res.json("Participante já faz parte desta horta!!")
        }

        if (exists) {
            await crop.updateOne(
                { _id: exists._id },
                { $addToSet: { participantes: usuario } }
            )
            return res.json('Participante inserido com sucesso!')
        }
        return res.json('Horta não existe!')
    },

    async removeUser(req, res) {
        const { dono, nome, usuario } = req.body

        const participantExists = await crop.findOne({ participantes: usuario })
        const exists = await crop.findOne({ dono, nome })

        if (participantExists) {
            if (exists) {
                await crop.updateOne(
                    { dono: dono, nome: nome },
                    { $pull: { participantes: usuario } }
                )
                return res.json("Participante removido com sucesso!")
            }
            return res.json("Horta não existe!")
        }
        return res.json("Participante não faz parte desta horta!")
    },

    async update(req, res) {
        const { dono, nome, novoNome } = req.body

        const exists = await crop.findOne({ dono, nome })

        if (nome == novoNome) {
            return res.json("O novo nome deve ser diferente do atual!")
        }

        if (!exists) {
            return res.json("Horta não existe!")
        }

        await crop.updateOne(
            { _id: exists._id },
            { $set: { nome: novoNome, dono: dono } },
            { upsert: false }
        )

        await user.updateOne(
            { usuario: dono },
            { $pull: { horta: nome } }
        )

        await user.updateOne(
            { usuario: dono },
            { $push: { horta: novoNome } }
        )

        return res.json("Alterações realizadas com sucesso!")
    }
}