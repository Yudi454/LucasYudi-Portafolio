const bebidaModal = require("../models/bebidaModel")

//GET
const getBebidas = async (req,res) => {
    console.log("pase por traer bebidas");
    try {
        const bebidas = await bebidaModal.find()
        res.status(200).json(bebidas)
    } catch (error) {
        res.status(404).json({message: `${error}`})
    }
}

//POST
const crearBebida = async (req,res) => {
    console.log("pase por crear bebida");
    try {
        const {name,Price,Image,Description} = req.body
        const bebidas = await bebidaModal.find()
        const bebidaRepetida = bebidas.find((bebida) => bebida.name == name )
        if (bebidaRepetida) {
            res.status(200).json({message: "Bebida ya creada"})
        } else {
            const bebida = new bebidaModal({
                name,
                Price,
                Image,
                Description
            });
            await bebida.save();
            res.status(200).json({message: "Bebida creada con exito"})
        }
    } catch (error) {
        res.status(404).json({message: `${error}`})
    }
}

//PUT
const editarBebida = async (req,res) => {
    console.log("pase por editar bebida");
    try {
        const _id = req.params.id
        const {name,Price,Image,Description} = req.body
        const bebida = await bebidaModal.findById(_id)
        if (bebida) {
            bebida.name = name || bebida.name;
            bebida.Price = Price || bebida.Price;
            bebida.Image = Image || bebida.Image;
            bebida.Description = Description || bebida.Description;
            await bebida.save();
            res.status(200).json({message: "Bebida editada con exito"})
        } else {
            res.status(404).json({message: `${error}`})
        }
    } catch (error) {
        res.status(404).json({message: `${error}`})
    }
}

//DELETE
const deleteBebida = async (req,res) => {
    console.log("pase por delete bebida");
    try {
        const id = req.params.id
        await bebidaModal.findOneAndDelete({_id: id})
        res.status(200).json({message: "Bebida eliminada con exito"})
    } catch (error) {
        res.status(404).json({message: `${error}`})
    }
}

module.exports = {
    crearBebida,
    getBebidas,
    editarBebida,
    deleteBebida
}