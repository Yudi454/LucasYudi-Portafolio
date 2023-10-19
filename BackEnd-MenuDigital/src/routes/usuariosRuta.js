const express = require("express")
const router = express.Router()

const usuarioController = require("../controllers/usuarioController")

//Get
router.get("/usuarios", usuarioController.getUsers)

//Post
router.post("/registro", usuarioController.register)
router.post("/login", usuarioController.login)

module.exports = router