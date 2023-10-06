import { useContext, useState } from "react";
import "./CardsHome.css"
import {Card, Row} from 'react-bootstrap';
import { ProductosContext } from "../../../context/context";

function BasicExample() {

  const {productos} = useContext(ProductosContext)
  console.log(productos);

  return (
    <div>
      <Row>
          {productos.map(function (producto) {
        return <div className="col-xl-3 col-lg-4 col-md-6" key={producto.id}>
        <Card className="my-4" >
          <Card.Img variant="top" src="https://scontent.ftuc3-1.fna.fbcdn.net/v/t1.6435-9/30710905_1877330909008623_1779282084603363328_n.jpg?_nc_cat=108&cb=99be929b-59f725be&ccb=1-7&_nc_sid=730e14&_nc_ohc=ttu9mzsBoAoAX9dNfS_&_nc_ht=scontent.ftuc3-1.fna&oh=00_AfDviZIwrPygPqvHDs5zqLkIRsY4fEq9NVbuMqq9TOHpRQ&oe=64B95575" />
          <Card.Body>
            <div className='d-flex justify-content-between'>
            <Card.Title>{producto.ProductoNombre  }</Card.Title>
            <span className='badge bg-warning d-flex align-items-center' >New</span>
            </div>
            <Card.Text>
              {producto.Descripcion}
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
            <p className="m-0">{producto.Precio}</p>
            <a className="btn-gray text-decoration-none text-center" >Buy</a>
            </div>
          </Card.Body>
        </Card>
        </div>
      })}

</Row>
    </div>
  );
}

export default BasicExample;

