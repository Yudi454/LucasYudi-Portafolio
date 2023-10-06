import { useContext } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { ProductosContext } from '../../context/context'
import "./MostrarProducto.css"
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';


const MostrarProducto = () => {
  const {productos} = useContext(ProductosContext)
  const { getApi } = useContext(ProductosContext)

  const URLProductos=import.meta.env.VITE_API_PRODUCTOS


    
  const EliminarProducto = (id) =>{
    Swal.fire({
      title: 'Está seguro de eliminar este producto?',
      text: "No se podra recuperar este producto eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then( async (result) => {
      if (result.isConfirmed) {

        try {
          const res = await fetch(`${URLProductos}/${id}`, {
            method :"DELETE",
            headers: {
              "Content-Type" : "application/json"
            }
          })
          console.log(res);
          {res.status === 200 && (
            Swal.fire({
              icon: 'success',
              title: 'Producto eliminado con éxito!',
            }),
              getApi()
          )}
        } catch (error) {
          console.log(error);
        }

        
      }
    })
    };

  return (
    <>
    <Container className='Container-Tabla'>
    <div className="border-bottom mt-2 mb-2">
        <h1>Agregar Producto</h1>
        </div>
        {productos.length === 0 ? (
              <Container className="d-flex justify-content-center mt-5 mb-5">
                <h1>🥐No Hay Productos Disponibles☕</h1>
              </Container> 
              
            ): (            
        <div className='d-flex justify-content-center'>
      <Table>
        <thead>
          <tr>
            <th>Numero</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripcion</th>
            <th>Categoria</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) =>
          <tr key={producto.id}>
           <td>{producto.id}</td> 
           <td>{producto.ProductoNombre}</td> 
           <td>{producto.Precio}</td> 
           <td>{producto.Descripcion}</td>
           <td>{producto.Categoria}</td>
           <td>
            <div className='d-flex'>
           <Link className="btn-Amarillo text-decoration-none text-center me-2" to={`/product/EditarProducto/${producto.id}`} >Editar Producto</Link>
           <a className="btn-Rojo text-decoration-none text-center" onClick={() =>{
            EliminarProducto(producto.id)
           }} >Eliminar</a>
           </div>
           </td>
          </tr>
          )}
        </tbody>
      </Table>
        </div>
            )}
    </Container>
    </>
  )
}

export default MostrarProducto