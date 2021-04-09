const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

const routes = require('../routes')

const server = express()

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
)

server.use(cors())
server.use(express.json())
server.use(routes)

const app = server.listen(3333)

module.exports = app

