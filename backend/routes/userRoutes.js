const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController.js")



router.post("/signup",UserController.signup) //yeni endpoint

module.exports = router