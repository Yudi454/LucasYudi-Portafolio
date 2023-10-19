const Usuarios = require("../models/usuarioModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//GET
const getUsers = async (req,res) => {
    console.log("pase get users");
    try {
        const users = await Usuarios.find()
        res.status(200).json(users)
    } catch (error) {
        console.log("Error:",error);
    }
}

//POST
const register = async (req,res) => {
    console.log("pase por registro");
    try {
        const {name,password} = req.body
        const users = await Usuarios.find()
        let userRepetido = users.find((user) => user.usuario == usuario)
        if (userRepetido) {
            res.status(200).json({message: "Usuario ya creado"})
        } else {
            const passwordHash = await bcrypt.hash(password, 10)
            const user = new Usuarios({
                name,
                passwordHash
            })
            await user.save()
            res.status(200).json({message: "Usuario creado con exito"})
        }
    } catch (error) {
        console.log(error);
    }
}

const login = async (req,res) => {
    console.log("pase por login");
    try {
        const user = await Usuarios.findOne({name : req.body.name})
        if (!user) {
            console.log("name no es correcto");
            return res.status(404).json({message: "Usuarios y/o contraseña incorrectos"})
        }
        const match = await bcrypt.compare(req.body.password, user.passwordHash)
        if (!match) {
            console.log("contraseña no es correcta");
            return res.status(404).json({message: "Usuarios y/o contraseña incorrectos"})
        }


        res.header("auth-token").json({
            message: "Usuario logueado con exito"
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getUsers,register,login}