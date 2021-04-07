const crop = require('../models/crop')
const user = require('../models/user')
const findLatlng = require('../service/findLatlng')

module.exports = {
    async store(req, res) {
        const {
            nome,
            dono,
            participantes,
            endereco
        } = req.body

        const cropExists = await crop.findOne({ dono })
        const userExists = await user.findOne({ username: dono })

        if (cropExists) {
            if (cropExists.nome == nome) {
                return res.json("Nome da horta já foi utilizada!")
            }
            if (cropExists.localizacao.endereco == endereco) {
                return res.json("Já existe uma horta cadastrada nesse endereço!")
            } else if (userExists) {
                if (userExists.horta.length > 2)
                    return res.json("Você atingiu o número máximo de hortas!")
            }
        }

        let localizacao

        if(endereco) {
            let latlng = await findLatlng(endereco)
            localizacao = {
                latitude: latlng.lat,
                longitude: latlng.lng,
                endereco: endereco
            }
        } else {
            return res.json('Endereço é obrigatório!')
        }

        const crops = await crop.create({
            nome: nome,
            dono: dono,
            participantes: participantes,
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
        return res.json(await crop.find())
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
        return res.json(parseInt(await crop.find()).length)
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
        let participantExists = false

        if (!exists)
            return res.json('Horta não existe!')

        exists.participantes.map(element => {
            if (element === usuario)
                participantExists = true
        })

        if (participantExists) {
            return res.json("Participante já faz parte desta horta!!")
        }

        await crop.updateOne(
            { _id: exists._id },
            { $addToSet: { participantes: usuario } }
        )
        return res.json('Participante inserido com sucesso!')
    },

    async removeUser(req, res) {
        const { dono, nome, usuario } = req.body

        const exists = await crop.findOne({ dono, nome })
        let participantExists = false

        if (!exists)
            return res.json('Horta não existe!')

        exists.participantes.map(element => {
            if (element === usuario)
                participantExists = true
        })

        if (!participantExists) {
            return res.json("Participante não faz parte desta horta!")
        }

        await crop.updateOne(
            { dono: dono, nome: nome },
            { $pull: { participantes: usuario } }
        )
        return res.json("Participante removido com sucesso!")
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
            {
                $set: {
                    horta: {
                        nome: novoNome
                    }
                }
            }
        )

        return res.json("Alterações realizadas com sucesso!")
    }
}