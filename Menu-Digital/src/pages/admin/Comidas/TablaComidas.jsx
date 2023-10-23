import React, { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { ProductosContext } from "../../../context/Context";

const TablaComidas = () => {
  const { Comidas } = useContext(ProductosContext);
  console.log(Comidas);

  return (
    <>
      <div className="Contenedor-Tabla">
        <Table striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Comidas === undefined ? (
              <tr>
                <td>Cargando...</td>
              </tr>
            ) : (
              Comidas.map((Comida) => (
                <tr key={Comida._id}>
                  <td>{Comida._id}</td>
                  <td>
                    <img
                      src=""
                      className="imagenTablas"
                      alt="Comida"
                      onError={(e) =>
                        console.log("Error al cargar la imagen", e)
                      }
                    />

                    <img src={Comida.Image} className="imagenTablas" alt="" />
                  </td>
                  <td>{Comida.name}</td>
                  <td>{Comida.Price}</td>
                  <td>{Comida.Description}</td>
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
  );
};

export default TablaComidas;
