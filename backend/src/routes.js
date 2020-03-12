const express = require('express')
const userController = require('./controllers/userController')
const routes = express.Router()

routes.post('/user/store', userController.store)

module.exports = routes