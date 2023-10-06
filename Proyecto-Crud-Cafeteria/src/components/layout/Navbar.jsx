import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap"
import { Link } from "react-router-dom";
import "./NavBar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";
import { ProductosContext } from "../context/context";


function BasicExample() {

  const user = JSON.parse(localStorage.getItem("user"));  
  const {getApi} = useContext(ProductosContext)

  const Desloguearte = () => {
    localStorage.removeItem("user")
    getApi()
  }

  const UsuarioAdmin = user ? (user.Email === "admin1@gmail.com" && user.Contraseña === "Admin678") : false;

  



  return (
    <Navbar bg="warning" expand="lg"  >
      <Container>
        <Navbar.Brand >React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
         
            <Link className="nav-link" to="/">Home</Link>

            {user
             ?
             <>
              <NavDropdown className="IconoUsuario"  title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown">
                {UsuarioAdmin
                  ?
                  <p className="NombreUsuario">Admin</p>              
                  :
                  <p className="NombreUsuario">{`${user.Nombre} ${user.Apellido}`}</p>
                }
                <NavDropdown.Divider />
                <NavDropdown.Item className="OpcionesUsuario">Editar Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="OpcionesUsuario" onClick={Desloguearte}>Desloguearse</NavDropdown.Item>
              </NavDropdown>
              {UsuarioAdmin &&(
              <>
              <Link className="nav-link" to="/MostrarProducto">Mostrar Producto</Link>
              <Link className="nav-link" to="/CrearProducto">Crear Producto</Link>
              </>
              )}
             </>
             
             
            :(
            <>
            <Link className="nav-link" to="/IniciarSesion">Iniciar Sesión</Link>
            <Link className="nav-link" to="/Registro">Registrarme</Link>
            </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
