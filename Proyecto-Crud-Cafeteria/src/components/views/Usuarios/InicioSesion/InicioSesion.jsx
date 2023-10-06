import { Button, Container, Form, Stack } from 'react-bootstrap'
import {useFormik} from "formik";
import * as Yup from "yup" ;
import clsx from "clsx";
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { ProductosContext } from '../../../context/context';
import { Link, useNavigate } from 'react-router-dom';

const InicioSesion = () => {
  const {usuarios, getApi } = useContext(ProductosContext)
  const URLUsuarios = import.meta.env.VITE_API_USUARIOS

  const navigate = useNavigate()




    const email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    const contraseña= /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
    

    const esquemaUsuario= Yup.object().shape({
            Email:Yup.string()
            .required("El email es requerido")
            .matches(email,"Ingrese un formato de email correcto")
            .min(16,"Ingrese un email mayor a 16 carácteres")
            .max(40,"Ingrese un email menor a 40 carácteres"),

            Contraseña:Yup.string()
            .required("La contraseña es requerida")
            .matches(contraseña,"La contraseña debe de contener entre 8 y 16 carácteres, al menos un dígito, al menos una minuscula y al menos una mayuscula"),


        })

        const valoresIniciales ={
            Email:'',
            Contraseña:'',
        } 

        const formik= useFormik({
            initialValues: valoresIniciales,
            validationSchema : esquemaUsuario,
            validateOnChange: true,
            validateOnBlur: true,
            onSubmit: (values) =>{

              try {
                const user = usuarios.find(
                  (user) => user.Email === values.Email && user.Contraseña === values.Contraseña
                )
                user
                ? (
                    localStorage.setItem("user", JSON.stringify(user)),
                    Swal.fire({
                      icon: 'success',
                      title: 'Iniciaste sesión exitosamente!',
                    }),
                    navigate("/"),
                    getApi()
                  )
                : Swal.fire({
                    icon: 'error',
                    title: 'Usuario no encontrado',
                  });
              

              } catch (error) {
                console.log(error);
              }

        }
        })

  return (
    <>
    <Container>

        <div className="border-bottom mt-2 mb-2">
            <h1>Iniciar Sesión</h1>
        </div> 
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Stack gap={2}>
          <Form.Group>
                <Form.Label>Email :</Form.Label>
                <Form.Control type='email' placeholder='Ej: Lucas@gmail.com' id='Email'
                {...formik.getFieldProps("Email")}
                className={clsx(
                    "form.control",{
                        "is-invalid" : formik.touched.Email && formik.errors.Email
                    },{
                        "is-valid" : formik.touched.Email && !formik.errors.Email
                    }
                )}
                />
                {formik.touched.Email && formik.errors.Email && (
                     <div>
                     <span role="alert" className="text-danger">{formik.errors.Email}</span>
                 </div>
                )}
            </Form.Group>
            <Form.Group>
                <Form.Label>Contraseña :</Form.Label>
                <Form.Control type='password' placeholder='Ej: 1234' id='Contraseña'
                {...formik.getFieldProps("Contraseña")}
                className={clsx(
                    "form-control",{
                        "is-invalid" : formik.touched.Contraseña && formik.errors.Contraseña
                    },{
                        "is-valid" : formik.touched.Contraseña && !formik.errors.Contraseña
                    }
                )}
                />
                {formik.touched.Contraseña && formik.errors.Contraseña && (
                      <div>
                      <span role="alert" className="text-danger">{formik.errors.Contraseña}</span>
                  </div>
                )}
            </Form.Group>
          </Stack>
          <div className='d-flex justify-content-end mt-2 mb-2'>
                <Button type="submit">Guardar</Button>
            </div>
        </Form>
        <Container className='d-flex justify-content-center mb-4'>
             <Link className="nav-link" to="/product/Registro">Si usted no está registrado haga click aquí</Link>
        </Container>
    </Container>
    </>
  )
}

export default InicioSesion