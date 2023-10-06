import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Carta from "./components/carta/carta"
import Movimientos from "./components/movimientos/movimientos";

function App() {
  return (
    <>
      <Carta />
      <Movimientos/ >
    </>
  );
}

export default App;
