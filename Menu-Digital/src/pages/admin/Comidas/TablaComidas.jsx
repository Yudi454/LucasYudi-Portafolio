import React, { useContext, useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { ProductosContext } from "../../../context/Context";
import EditarComida from "./EditarComida";

const TablaComidas = () => {
  const { Comidas, PasarStates, comidaPorId } = useContext(ProductosContext);

  const { selectId, setSelectId, comida } = PasarStates;

  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [comidasMostrar, setComidasMostrar] = useState()
  const comidasPerPage = 5;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const indexOfLastComida = currentPage * comidasPerPage;
  const indexOfFirstComida = indexOfLastComida - comidasPerPage;
  useEffect(() => {
    if (Comidas) {
      const currentComidas = Comidas.slice(indexOfFirstComida, indexOfLastComida);
      setComidasMostrar(currentComidas);
    }
  }, [Comidas, indexOfFirstComida, indexOfLastComida]);
  

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  useEffect(() => {
    if (comida == undefined && selectId) {
      comidaPorId();
    }
  }, [selectId]);


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
          {!comidasMostrar ? (
            <tr>
              <td>Cargando...</td>
            </tr>
          ):(
            
          comidasMostrar.map((Comida) => (
              <tr key={Comida._id}>
                <td>{Comida._id}</td>
                <td>
                  <img src={Comida.Image} className="imagenTablas" alt="" />
                </td>
                <td>{Comida.name}</td>
                <td>{Comida.Price}</td>
                <td>{Comida.Description}</td>
                <td>
                  <Button
                    onClick={(e) => {
                      setSelectId(Comida._id);
                      handleShow();
                    }}
                  >
                    Editar
                  </Button>
                  <Button>Borrar</Button>
                </td>
              </tr>
            )))}
          </tbody>
        </Table>
        <EditarComida show={show} setShow={setShow} handleClose={handleClose} />
      </div>
      <div className="pagination d-flex justify-content-center">
        {Comidas && Comidas.length > comidasPerPage &&
          Array.from({ length: Math.ceil(Comidas.length / comidasPerPage) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
      </div>
    </>
  );
};

export default TablaComidas;
