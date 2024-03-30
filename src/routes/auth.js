//import express
const express = require('express')
const { Login, signUp } = require('../controllers/auth')
const { getsAllUsers, getOneUser } = require('../controllers/user')


//create express routes 
const router = express.Router()


//define your routes
router.post('/signup', signUp)
router.post('/login', Login)
router.get('/users', getsAllUsers)
router.get('/user/:userId', getOneUser)




module.exports = router

