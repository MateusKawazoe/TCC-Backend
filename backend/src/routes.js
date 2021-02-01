const express = require('express')
const userController = require('./controllers/userController')
const cropController = require('./controllers/cropController')
const routes = express.Router()

// Users routes --

routes.post('/user/store', userController.store)

routes.get('/user/usersNumber', userController.usersNumber)

routes.get('/user/showAll', userController.showAll)

routes.get('/user/showOne', userController.showOne)

routes.delete('/user/delete', userController.delete)

routes.put('/user/update', userController.update)

// -- Users routes

// Crop routes --

routes.post('/crop/store', cropController.store)

routes.get('/crop/CropsNumber', cropController.cropsNumber)

routes.get('/crop/showAll', cropController.showAll)

routes.get('/crop/showOne', cropController.showOne)

routes.delete('/crop/delete', cropController.delete)

routes.put('/crop/insertUser', cropController.insertUser)

routes.put('/crop/removeUser', cropController.removeUser)

routes.put('/crop/update', cropController.update)

// -- Crop routes

module.exports = routes