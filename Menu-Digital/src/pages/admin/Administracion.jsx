import React, { useContext } from "react";
import { ProductosContext } from "../../context/Context";
import "../../style/Administracion.css";
import InicioSesion from "./InicioSesion/InicioSesion";
import TablaComidas from "./Comidas/TablaComidas";
import CrearComida from "./Comidas/CrearComida";

const Administracion = () => {
  const { PasarStates, Comidas, Bebidas, TraerProductos } =
    useContext(ProductosContext);
  const {
    MostrarInicioSesion,
    MostrarTabla,
    setMostrarInicioSesion,
    setMostarTabla,
  } = PasarStates;

  {
    Comidas === undefined && Bebidas === undefined && TraerProductos();
  }

  return (
    <>
      {MostrarTabla === false ? (
        <InicioSesion />
      ) : (
        <>
          <div className="text-center mt-3 mb-3">
            <h1>Administracion</h1>
          </div>
          <div className="text-center">
            <h1>Tabla Comidas</h1>
            <CrearComida />
            <TablaComidas />
          </div>
        </>
      )}
    </>
  );
};

export default Administracion;
