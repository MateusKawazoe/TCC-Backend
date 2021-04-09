const cropTest = require('./controllers/cropController')
const userTest = require('../test/controllers/userController')
const authTest = require('../test/service/auth')
const findLatlngTest = require('../test/service/findLatlng')
const findZipCodeTest = require('../test/service/findZipCode')
const findFullAddressTest = require('../test/service/findFullAddress')
const server = require('../src/config/server')
const mongoose = require('mongoose')

var app

beforeAll(async (done) => {
    app = await server
    done()
})

describe('controllers test', () => {
    cropTest()
    userTest()
})

describe('service test', () => {
    authTest()
    findLatlngTest()
    findZipCodeTest()
    findFullAddressTest()
})

afterAll(async (done) => {
    app.close()
    await mongoose.connection.close()
    done()
})