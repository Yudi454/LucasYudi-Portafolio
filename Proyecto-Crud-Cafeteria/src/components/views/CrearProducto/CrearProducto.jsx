import { useContext } from 'react'
import { Button, Container, Form, Stack } from 'react-bootstrap'
import {useFormik} from "formik";
import * as Yup from "yup" ;
import clsx from "clsx";
import Swal from 'sweetalert2';
import { ProductosContext } from '../../context/context';
import { useNavigate } from 'react-router-dom'; 

const CrearProducto = () => {



    const { getApi } = useContext(ProductosContext)
    const URLProductos=import.meta.env.VITE_API_PRODUCTOS



    const navigate = useNavigate()

    const soloLetras= /^[a-zA-Z ]+$/
    const soloNumeros= /^[0-9]+$/
    const soloUrls= /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/

    const esquemaCarga= Yup.object().shape({
            Nombre:Yup.string()
            .required("El nombre es requerido")
            .matches(soloLetras, "Solo son validas letras")
            .min(4,"Ingrese mas de 4 letras")
            .max(25,"Ingrese menos de 25 letras"),

            Precio:Yup.string()
            .required("El precio es requerido")
            .matches(soloNumeros,"Solo son validos los numeros")
            .min(3,"Ingrese un precio mayor a 3 digitos")
            .max(7,"Ingrese un precio menor a 7 digitos"),

            Url:Yup.string()
            .required("La url es requerida para la imagen del producto")
            .matches(soloUrls,"Ingrese una Url valida"),

            Descripcion:Yup.string()
            .required("La descripción es requerida")
            .min(10,"Como minimo 10 carácteres")
            .max(25,"Como máximo 25 carácteres"),

            Categoria:Yup.string()
            .required("Debe de seleccionar una categoria si o si")
        })

        const valoresIniciales ={
            Nombre:'',
            Precio:'',
            Url:'',
            Categoria:'',
            Descripcion:''
        }

        const formik= useFormik({
            initialValues: valoresIniciales,
            validationSchema : esquemaCarga,
            validateOnChange: true,
            validateOnBlur: true,
            onSubmit: (values) =>{
                Swal.fire({
                    title: 'Esta seguro de que desea crear el producto?',
                    text: "Cualquier cambio lo puede realizar desde mostrar productos",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'No',
                    confirmButtonText: 'Si'
                  }).then( async (result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Producto creado con éxito!',
                        })

                        const Producto = {
                            ProductoNombre: values.Nombre,
                            Precio: '$' + values.Precio,
                            Descripcion : values.Descripcion,
                            Url: values.Url,
                            Categoria:values.Categoria,
                        }    
                        
                      try {
                        const res= await fetch(URLProductos,{
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(Producto)
                        });

                      } catch (error) {
                        console.log(error)
                      }

                      navigate("/product/MostrarProducto")
                      getApi()
                      //SetProductos([...productos, Producto]);
                      //console.log(productos)
                    }
                  })
        }
        })


    return (
    <>
    <Container>
        <div className="border-bottom mt-2 mb-2">
        <h1>Agregar Producto</h1>
        </div>
        <Form onSubmit={formik.handleSubmit} noValidate>
            <Stack gap={2}>
            <Form.Group>
                <Form.Label>Nombre del Producto:</Form.Label>
                <Form.Control type='text' placeholder="Ej: Medialunas" id='Nombre'
                {...formik.getFieldProps("Nombre")}
                className={clsx(
                    "form-control",{
                        "is-invalid" : formik.touched.Nombre && formik.errors.Nombre,
                    },{
                        "is-valid" : formik.touched.Nombre && !formik.errors.Nombre,
                    }
                )}
                />
                {formik.touched.Nombre && formik.errors.Nombre &&(
                    <div>
                        <span role="alert" className="text-danger">{formik.errors.Nombre}</span>
                    </div>
                )}
            </Form.Group>
            <Form.Group>
                <Form.Label>Precio :</Form.Label>
                <Form.Control type='text' placeholder='Ej: 750' id='Precio'
                {...formik.getFieldProps("Precio")}
                className={clsx(
                    "form-control",{
                        "is-invalid" : formik.touched.Precio && formik.errors.Precio,
                    } ,{
                        "is-valid " : formik.touched.Precio && !formik.errors.Precio,
                    }
                )}
                />
                {formik.touched.Precio && formik.errors.Precio && (
                    <div>
                        <span role="alert" className="text-danger">{formik.errors.Precio}</span>
                    </div>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Descripción :</Form.Label>
                <Form.Control as="textarea" id='Descripcion' placeholder='Ej: Recién horneada con un exterior dorado y crujiente...' 
                {...formik.getFieldProps("Descripcion")}
                className={clsx(
                    "form-control",{
                        "is-invalid" : formik.touched.Descripcion && formik.errors.Descripcion
                    } , {
                        "is-valid" : formik.touched.Descripcion && !formik.errors.Descripcion
                    }
                )}
                />
                {formik.touched.Descripcion && formik.errors.Descripcion && (
                <div>
                    <span role="alert" className="text-danger">{formik.errors.Descripcion}</span>
                </div>
                )}
            </Form.Group>
                    <Form.Group>
                       <Form.Label>Categoria :</Form.Label>
                       <Form.Select id='Categoria' 
                       {...formik.getFieldProps("Categoria")}
                       className={clsx(
                           "form-control",{
                               "is-invalid" : formik.touched.Categoria && formik.errors.Categoria,
                           }, {
                               "is-valid" : formik.touched.Categoria && !formik.errors.Categoria,
                           }
                       )}
                       > 
                           <option value="">Seleccione Una Categoria</option>
                           <option value="Bebida Caliente">Bebida Caliente</option>
                           <option value="Bebida Fria">Bebida Fria</option>
                           <option value="Dulce">Dulce</option>
                           <option value="Salado">Salado</option>
                           <option value="Bocadillos">Bocadillos</option>
                           <option value="Postres">Postres</option>
                       </Form.Select>
                       {formik.touched.Categoria && formik.errors.Categoria && (
                           <div>
                               <span role="alert" className="text-danger">{formik.errors.Categoria}</span>
                           </div>
                       )}
                   </Form.Group> 
            <Form.Group>
                <Form.Label>Url de la imagen:</Form.Label>
                <Form.Control type='text' placeholder='placeholder="Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20"'
                {...formik.getFieldProps("Url")}
                className={clsx(
                    "form-control",{
                        "is-invalid" : formik.touched.Url && formik.errors.Url,
                    }, {
                        "is-valid" : formik.touched.Url && !formik.errors.Url,
                    }
                )}
                />
                {formik.touched.Url && formik.errors.Url && (
                    <div>
                        <span role="alert" className="text-danger">{formik.errors.Url}</span>
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

export default CrearProducto