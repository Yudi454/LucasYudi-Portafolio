const comidaModal = require("../models/comidaModel")

//POST

const crearComida = async (req,res) => {
    console.log("pase por crear comida");
    try {
        const {name,Price,Image,Description} = req.body
        const comidas = await comidaModal.find()
        const comidaRepetida = comidas.find((comida) => comida.name == name )
        if (comidaRepetida) {
            res.status(200).json({message: "Comida ya creada"})
        } else {
            const comida = new comidaModal({
                name,
                Price,
                Image,
                Description
            })
            await comida.save()
            res.status(200).json({message: "Comida creada con exito"})
        }
    } catch (error) {
        res.status(404).json({message: error})
    }
}

module.exports = {
    crearComida
} 