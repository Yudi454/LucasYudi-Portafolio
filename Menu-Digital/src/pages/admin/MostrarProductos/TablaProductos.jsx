import React, { useContext } from 'react'
import { Button, Table } from 'react-bootstrap'
import { ProductosContext } from '../../../context/Context'

const TablaProductos = () => {

    const {Productos} = useContext(ProductosContext)


  return (
    <>
    <div className='Contenedor-Tabla'>
     <Table striped>
      <thead>
        <tr>
          <th>Id</th>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {Productos === undefined ? (
            <tr>
                <td>Cargando...</td>
            </tr>
        ):(
        Productos.map((Producto) => (
            
            <tr key={Producto.id}>
                <td>{Producto.id}</td>
                <td><img src={Producto.Imagen} className='imagenTablas' alt="" /></td>
                <td>{Producto.Nombre}</td>
                <td>{Producto.Precio}</td>
                <td>
                    <Button>Editar</Button>
                    <Button>Borrar</Button>
                </td>
            </tr>
        ))
        )}
      </tbody>
    </Table>
    </div>
    </>
  )
}

export default TablaProductos