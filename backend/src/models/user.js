const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    foto: String,
    usuario: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    localizacao: {
        endereco: {},
        latitude: Number,
        longitude: Number
    },
    horta: [],
    publicacoes: [],
    nivel: {},
    integridade: Number
}, {
    timestamps: true
})

module.exports = model('user', userSchema)