const comidaModal = require("../models/comidaModel")

//GET
const getComida = async (req,res) => {
    console.log("pase por get comida");
    try {
        const comidas = await comidaModal.find()
        res.status(200).json(comidas)
    } catch (error) {
        console.log(error);
    }
}

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

//PUT

const editarComida = async (req,res) => {
    console.log("pase por editar comida");
    try {
        const _id = req.params.id
        const {name,Price,Image,Description} = req.body
        const comida = await comidaModal.findById(_id)
        if (comida) {
            comida.name = name || comida.name;
            comida.Price = Price || comida.Price;
            comida.Image = Image || comida.Image;
            comida.Description = Description || comida.Description;
            await comida.save();
            res.status(200).json({message: "Comida editada con exito"})
        } else {
            res.status(404).json({message: "Comida no encontrada"})
        }
    } catch (error) {
        console.log(error);
    }
}

//DELETE
const deleteComida  = async(req,res) => {
    console.log("pase por delete comida");
    try {
        const id = req.params.id
        await comidaModal.findOneAndDelete({_id: id})
        res.status(200).json({message: "Comida eliminada con exito"})
    } catch (error) {
        res.status(404).json({message: "No se pudo eliminar la comida"})
    }
}

module.exports = {
    crearComida,
    getComida,
    editarComida,
    deleteComida
} 