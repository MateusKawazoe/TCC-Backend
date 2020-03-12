const { Schema, model } = require('mongoose')

const cropSchema = new Schema({
    dono: {
        type: Number,
        required: true
    },
    participantes: {},
    localização: {
        endereço: {},
        latitude: Number,
        longitude: Number,
        required: true
    },
    sensores: {},
    nivel: {}
}, {
    timestamps: true
})

module.exports = model('crop', cropSchema)