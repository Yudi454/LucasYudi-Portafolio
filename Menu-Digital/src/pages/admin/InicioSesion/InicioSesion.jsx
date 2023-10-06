import React, { useContext } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import {useFormik} from "formik";
import * as Yup from "yup" ;
import clsx from "clsx";
import Swal from 'sweetalert2';
import { ProductosContext } from '../../../context/Context';


const InicioSesion = () => {

    const {Usuario} = useContext(ProductosContext)
    console.log(Usuario);

  return (
    <>
    <div className='text-center'>
        <h1>Inicia Sesion</h1>
    </div>
    <div className='d-flex justify-content-center mt-2'>
    <Form>
        <Stack gap={2}>
        <Form.Group>
            <Form.Label>Usuario:</Form.Label>
            <Form.Control />
        </Form.Group>
        <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control />
        </Form.Group>
        </Stack>
        <Button className='mt-3'>Iniciar Sesion</Button>
    </Form>
    </div>
    </>
  )
}

export default InicioSesion