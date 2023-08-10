import { Route, Routes, redirect, useNavigate } from "react-router-dom"
import MostrarProducto from "../views/MostrarProducto/MostrarProducto"
import CrearProducto from "../views/CrearProducto/CrearProducto"
import EditarProducto from "../views/EditarProducto/EditarProducto"
import Home from "../views/Home/Home"
import Error404 from "../views/Error404/Error404"

import Registro from "../views/Usuarios/Registro/Registro"
import InicioSesion from "../views/Usuarios/InicioSesion/InicioSesion"
import { useContext, useEffect } from "react"
import { ProductosContext } from "../context/context"


const routes = () => {
  
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()

  const {getApi} = useContext(ProductosContext)

  const UsuarioAdmin = user ? (user.Email === "admin1@gmail.com" && user.Contraseña === "Admin678") : false;



  return (
    <>
   <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/IniciarSesion" element={<InicioSesion />} />
  <Route path="/Registro" element={<Registro />} />
  <Route path="*" element={<Error404 />} />
  {UsuarioAdmin &&
        <>
          <Route path="/MostrarProducto" element={<MostrarProducto />} />
          <Route path="/CrearProducto" element={<CrearProducto />} />
          <Route path="/EditarProducto/:id" element={<EditarProducto />} />
        </>
      }
</Routes>
    </>
  )
}

export default routes