const express = require("express")
const router = express.Router()

const comidaController = require("../controllers/comidaController")

//Get
router.get("/Comida", comidaController.getComida)

//Post
router.post("/Comida", comidaController.crearComida)

//Put
router.put("/Comida/:id", comidaController.editarComida)

//Delete
router.delete("/Comida/:id", comidaController.deleteComida)

module.exports = router