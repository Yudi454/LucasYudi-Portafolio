import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Error404 from '../pages/Error/Error404'
import Administracion from '../pages/admin/Administracion'

const Rutas = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/*' element={<Error404 />} />
            <Route path='/Administracion' element={<Administracion />} />
        </Routes>
    </>
  )
}

export default Rutas