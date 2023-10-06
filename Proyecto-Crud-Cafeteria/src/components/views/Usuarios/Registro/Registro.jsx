import { Button, Container, Form, Stack } from 'react-bootstrap'
import {useFormik} from "formik";
import * as Yup from "yup" ;
import clsx from "clsx";
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { ProductosContext } from '../../../context/context';

const Registro = () => {

    const {usuarios} = useContext(ProductosContext)
    const URLUsuarios = import.meta.env.VITE_API_USUARIOS

    const soloLetras= /^[a-zA-Z ]+$/
    const email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    const contraseña= /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
    const soloUrls= /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/

    const esquemaUsuario= Yup.object().shape({
            Nombre:Yup.string()
            .required("El nombre es requerido")
            .matches(soloLetras,"Solo son validas Letras")
            .min(3,"Ingrese un nombre mayor a 3 letras")
            .max(13,"Ingrese un nombre mayor a 10 letras"),

            Apellido:Yup.string()
            .required("El apellido es requerido")
            .matches(soloLetras,"Solo son validas Letras")
            .min(3,"Ingrese un apellido mayor a 3 letras")
            .max(13,"Ingrese un apellido mayor a 10 letras"),

            Email:Yup.string()
            .required("El email es requerido")
            .matches(email,"Ingrese un formato de email correcto")
            .min(16,"Ingrese un email mayor a 16 carácteres")
            .max(40,"Ingrese un email menor a 40 carácteres"),

            Contraseña:Yup.string()
            .required("La contraseña es requerida")
            .matches(contraseña,"La contraseña debe de contener entre 8 y 16 carácteres, al menos un dígito, al menos una minuscula y al menos una mayuscula"),

            RepetirContraseña:Yup.string()
            .required("Debe ingresar la contraseña nuevamente")
            .oneOf([Yup.ref('Contraseña')],'Las contraseñas deben de coincidir')

        })

        const valoresIniciales ={
            Nombre:'',
            Apellido:'',
            Email:'',
            Contraseña:'',
            RepetirContraseña:''
        } 

        const formik= useFormik({
            initialValues: valoresIniciales,
            validationSchema : esquemaUsuario,
            validateOnChange: true,
            validateOnBlur: true,
            onSubmit: async (values) => {
                try {
                  const user = usuarios.find((user) => user.Email === values.Email);
              
                  user
                    ? Swal.fire({
                        icon: 'error',
                        title: 'Ya existe una cuenta registrada con ese email',
                        text: 'Intente con otro o cree un nuevo usuario',
                      })
                    : (async () => {
                        const Usuario = {
                          Nombre: values.Nombre,
                          Apellido: values.Apellido,
                          Email: values.Email,
                          Contraseña: values.Contraseña,
                        };
              
                        const res = await fetch(URLUsuarios, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(Usuario),
                        });
                        
                        res.ok
                            ? Swal.fire({
                            icon: 'success',
                            title: 'Usuario creado con éxito!',
                            })
                        : Swal.fire({
                            icon: 'error',
                            title: 'Ocurrió un error al crear el usuario Intente nuevamente.',
                            })
                        
                            })();
                } catch (error) {
                  console.log(error);
                }
              }
              
              
        })


  return (
    <>
    <Container>
        <div className="border-bottom mt-2 mb-2">
            <h1>Registro</h1>
        </div>
        <Form onSubmit={formik.handleSubmit} noValidate>
            <Stack gap={2}>
            <Form.Group>
                <Form.Label>Nombre :</Form.Label>
                <Form.Control type='text' placeholder='Ej: Lucas' id='Nombre'
                {...formik.getFieldProps("Nombre")}
                className={clsx(
                    "form-control",{
                        "is-invalid" : formik.touched.Nombre && formik.errors.Nombre
                     } , {
                        "is-valid" : formik.touched.Nombre && !formik.errors.Nombre
                     }
                )}
                />
                {formik.touched.Nombre && formik.errors.Nombre && (
                 <div>
                     <span role="alert" className="text-danger">{formik.errors.Nombre}</span>
                 </div>
                )}
            </Form.Group>
            <Form.Group>
                <Form.Label>Apellido :</Form.Label>
                <Form.Control type='text' placeholder='Ej: Yudi' id='Apellido'
                {...formik.getFieldProps("Apellido")}
                className={clsx(
                    "form-control",{
                        "is-invalid" : formik.touched.Apellido && formik.errors.Apellido
                    },{
                        "is-valid" : formik.touched.Apellido && !formik.errors.Apellido
                    }
                )}
                />
                {formik.touched.Apellido && formik.errors.Apellido && (
                    <div>
                    <span role="alert" className="text-danger">{formik.errors.Apellido}</span>
                </div>
                )}
            </Form.Group>
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
            <Form.Group>
                <Form.Label>Repetir Contraseña :</Form.Label>
                <Form.Control type='password' placeholder='Repetir la contraseña' id='RepetirContraseña'
                {...formik.getFieldProps("RepetirContraseña")}
                className={clsx(
                    "form-control",{
                        "is-invalid" : formik.touched.RepetirContraseña && formik.errors.RepetirContraseña
                    },{
                        "is-valid" : formik.touched.RepetirContraseña && !formik.errors.RepetirContraseña
                    }
                )}
                />
                {formik.touched.RepetirContraseña && formik.errors.RepetirContraseña && (
                      <div>
                      <span role="alert" className="text-danger">{formik.errors.RepetirContraseña}</span>
                  </div>
                )}
            </Form.Group>
            </Stack>
            <div className='d-flex justify-content-end mt-2 mb-2'>
                <Button type="submit">Guardar</Button>
            </div>
        </Form>
    </Container>
    </>
  )
}

export default Registro