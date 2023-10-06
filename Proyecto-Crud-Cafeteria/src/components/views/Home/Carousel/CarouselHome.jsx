import {Carousel} from "react-bootstrap"

const CarouselHome = () => {
  return (
    <>
    <div className="mt-2 mb-2">
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.tastingtable.com/img/gallery/coffee-brands-ranked-from-worst-to-best/intro-1645231221.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
        <h3>Bienvenidos a nuestra cafetería</h3>
        <p>Disfruta de nuestros deliciosos cafés y ambiente acogedor</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://live.staticflickr.com/65535/52989208379_3c824c7a9c_c.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
        <h3>Deliciosos croissants recién horneados</h3>
        <p>Prueba nuestros croissants hechos con ingredientes frescos y auténticos</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://live.staticflickr.com/65535/52989536728_f7d6f777f7_c.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
        <h3>Variedad de panes artesanales</h3>
        <p>Descubre nuestros panes frescos y sabrosos, horneados con pasión</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>    
    </>
  )
}

export default CarouselHome