import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Home from "./components/views/Home/Home"
import MostrarProducto from "./components/views/MostrarProducto/MostrarProducto"
import { ProductosProvider } from "./components/context/context"
import Rutas from "./components/routes/Rutas"

function App() {
  

  return (
    <>
      <ProductosProvider>
          <Navbar />
          <main>
            <Rutas />
          </main>
          <Footer />

      </ProductosProvider>
    </>
  )
}

export default App
