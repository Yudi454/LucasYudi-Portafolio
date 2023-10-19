const express = require("express")
const router = express.Router()

const comidaController = require("../controllers/comidaController")

//Post
router.post("/Comida", comidaController.crearComida)

module.exports = router