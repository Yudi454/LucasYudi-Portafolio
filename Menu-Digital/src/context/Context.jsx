import axios from "axios"
import { createContext, useEffect, useState } from "react"


export const ProductosContext = createContext()

export const ProductosProvider = ({children}) => {

    const [selectId,setSelectId] = useState()  
    const [comida, setComida] = useState()
    const [bebida, setBebida] = useState()
    const url = import.meta.env.VITE_API_BACK
    const URLComidas = import.meta.env.VITE_API_COMIDAS
    const URLBebidas = import.meta.env.VITE_API_BEBIDAS
    const URLUsuarios = import.meta.env.VITE_API_USUARIO
    const [Comidas, setComidas] = useState()
    const [Bebidas, setBebidas] = useState()
    const [Usuarios, setUsuarios] = useState()
    const [Usuario, setUsuario] = useState()
    const [MostrarInicioSesion, setMostrarInicioSesion] = useState()
    const [MostrarTabla, setMostrarTabla] = useState(true)

    

    const TraerProductos = async () =>{

        try {
            const resComidaBack = await axios.get(`${url}/Comida`)
            const resComida = await resComidaBack.data
            const resBebidaBack = await axios.get(`${url}/Bebida`)
            const resBebida = await resBebidaBack.data
            const resUsuariosBack = await axios.get(`${url}/usuarios`)
            const resUsuarios = await resUsuariosBack.data
            setUsuarios(resUsuarios)
            setBebidas(resBebida)
            setComidas(resComida)
        } catch (error) {
            console.log(error);
        }
    }
    
    const comidaPorId = async () =>{
        try {
                const res = await axios.get(`${url}/Comida/${selectId}`)
                setComida(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const bebidaPorId = async () => {
        try {
            const res = await axios.get(`${url}/Bebida/${selectId}`)
            setBebida(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const usuarioPorId = async () => {
        try {
            const res = await axios.get(`${url}/usuarios/${selectId}`)
            setUsuario(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const PasarStates = {
        MostrarInicioSesion,
        MostrarTabla,
        setMostrarInicioSesion,
        setMostrarTabla,
        selectId,
        setSelectId,
        comida,
        bebida,
        setBebida,
        setComida,
        Usuario,
        setUsuario,
        Usuarios

    }

    const PasarDatos = {
        Comidas,
        Bebidas,
        TraerProductos,
        PasarStates,
        comidaPorId,
        bebidaPorId,
        usuarioPorId
    }

  return (
    <>
        <ProductosContext.Provider value={PasarDatos}>
            {children}
        </ProductosContext.Provider>
    </>
  )
}

