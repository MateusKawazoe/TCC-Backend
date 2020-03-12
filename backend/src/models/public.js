const { Schema, model } = require('mongoose')

const publicSchema = new Schema({
    conteudo: {
        required: true
    },
    avaliacao: {
        required: true,
        positiva: Number,
        negativa: Number,
    }
})

module.export = model('public', publicSchema)