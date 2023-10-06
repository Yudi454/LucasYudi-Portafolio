import "./Home.css"
import CarouselHome  from './Carousel/CarouselHome'
import { Container } from 'react-bootstrap'
import CardsHome from "./Cards/CardsHome"
import { useContext } from "react"
import { ProductosContext } from "../../context/context"


const Home = () => {
  const {productos} = useContext(ProductosContext)

  return (
    <>
    <div>
        <CarouselHome />
        <Container>
          
        </Container>
        <Container>
            <div className="border-bottom">
            <h1>Productos</h1>
            </div>
            {productos.length === 0 ? (
              <Container className="d-flex justify-content-center mt-5 mb-5">
                <h1>🥐No Hay Productos Disponibles☕</h1>
              </Container> 
              
            ): (
              <CardsHome />
            )}
        </Container>
    </div>
    </>
  )
}

export default Home