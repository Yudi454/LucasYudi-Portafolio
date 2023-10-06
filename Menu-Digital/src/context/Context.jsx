import { createContext, useState } from "react"


export const ProductosContext = createContext()

export const ProductosProvider = ({children}) => {
  
    const URLComidas = import.meta.env.VITE_API_COMIDAS
    const URLBebidas = import.meta.env.VITE_API_BEBIDAS
    const URLUsuarios = import.meta.env.VITE_API_USUARIO
    const [Comidas, setComidas] = useState()
    const [Bebidas, setBebidas] = useState()
    const [Productos, setProductos] = useState()
    const [Usuario, setUsuario] = useState()
    const [MostrarInicioSesion, setMostrarInicioSesion] = useState()
    const [MostrarTabla, setMostrarTabla] = useState(false)

    const TraerProductos = async () =>{
        try {
            const resComida = await fetch(URLComidas)
            const resBebida = await fetch(URLBebidas)
            const resUsuario = await fetch(URLUsuarios)
            const usuario = await resUsuario.json()
            const comidas = await resComida.json()
            const bebidas = await resBebida.json()

            const productos = [...comidas, ...bebidas];

            setComidas(comidas)
            setBebidas(bebidas)
            setProductos(productos)
            setUsuario(usuario)
        } catch (error) {
            console.log(error);
        }
    }


    
    const PasarStates = {
        MostrarInicioSesion,
        MostrarTabla,
        setMostrarInicioSesion,
        setMostrarTabla
    }

    const PasarDatos = {
        Comidas,
        Bebidas,
        TraerProductos,
        Productos,
        PasarStates,
        Usuario
    }

  return (
    <>
        <ProductosContext.Provider value={PasarDatos}>
            {children}
        </ProductosContext.Provider>
    </>
  )
}

