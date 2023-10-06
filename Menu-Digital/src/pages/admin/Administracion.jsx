import React, { useContext } from 'react'
import { ProductosContext } from '../../context/Context'
import TablaProductos from './MostrarProductos/TablaProductos'
import "../../style/Administracion.css"
import InicioSesion from './InicioSesion/InicioSesion'

const Administracion = () => {

    const {PasarStates, Comidas, Bebidas, TraerProductos} = useContext(ProductosContext)
    const {MostrarInicioSesion, MostrarTabla, setMostrarInicioSesion, setMostarTabla} = PasarStates

    {Comidas === undefined && Bebidas === undefined && (
        TraerProductos()
      )}



  return (
    <>
    {MostrarTabla === false ? (
      <InicioSesion />
    ):(
    <>  
    <div className='text-center mt-3 mb-3'>
        <h1>Administracion</h1>
    </div>
    <div className='text-center'>
        <h1>Tabla Productos</h1>
    </div>
    <TablaProductos />
    </>
    )}
    </>
  )
}

export default Administracion