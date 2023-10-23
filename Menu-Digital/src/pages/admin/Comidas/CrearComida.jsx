import { useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import axios from "axios";

const CrearComida = () => {
  const [show, setShow] = useState(false);

  const back = import.meta.env.VITE_API_BACK

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const regexSoloLetra = /^[A-Za-z]+( [A-Za-z]+)?$/;
  const regexDescripcion = /^(?!.*\s{3,}).*$/;

  const esquemaComida = Yup.object().shape({
    Nombre: Yup.string()
      .required("El nombre es requerido")
      .min(4, "El Nombre debe ser igual o mayor a 4 letras")
      .max(15, "El Nombre debe ser igual o menor a 15 digitos")
      .matches(regexSoloLetra, "El nombre solo debe contener letras"),

    Precio: Yup.number()
      .required("El precio es requerido")
      .min(1, "El precio debe ser igual o mayor a 1 digitos")
      .max(10000, "El precio debe ser igual o menor a 100000 digitos"),

    Descripcion: Yup.string()
      .required("La descripcion es requerida")
      .min(15, "La descripcion debe tener 15 o mas digitos")
      .max(50, "La descripcion debe tener 50 o menos digitos")
      .matches(regexDescripcion, "No se permiten multiples espacios"),

    Imagen: Yup.string().required("La imagen es requerida"),
  });

  const valoresIniciales = {
    Nombre: "",
    Precio: 0,
    Descripcion: "",
    Imagen: "",
  };

  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaComida,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      console.log(values);

      try {
        const comida = {
          name: values.Nombre,
          Price: values.Precio,
          Description: values.Descripcion,
          Image: values.Imagen
        };

        const formData = new FormData()
        formData.append("name", values.Nombre);
        formData.append("Price", values.Precio);
        formData.append("Description", values.Descripcion);
        formData.append("Image", values.Imagen)

        const response = await axios.post(`${back}/Comida`, formData,{
            headers: {
                "Content-Type": "multipart/form-data",
              },
        });

        console.log(response.data.message);

      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario para Crear Comida</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Modal.Body>
            <Stack gap={2}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese un nombre a la comida"
                  id="Nombre"
                  min={4}
                  max={15}
                  {...formik.getFieldProps("Nombre")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid":
                        formik.touched.Nombre && formik.errors.Nombre,
                    },
                    {
                      "is-valid":
                        formik.touched.Nombre && !formik.errors.Nombre,
                    }
                  )}
                />
                {formik.touched.Nombre && formik.errors.Nombre && (
                  <div>
                    <span className="text-danger">{formik.errors.Nombre}</span>
                  </div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese un precio"
                  min={1}
                  max={10000}
                  {...formik.getFieldProps("Precio")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid":
                        formik.touched.Precio && formik.errors.Precio,
                    },
                    {
                      "is-valid":
                        formik.touched.Precio && !formik.errors.Precio,
                    }
                  )}
                />
                {formik.touched.Precio && formik.errors.Precio && (
                  <div>
                    <span className="text-danger">{formik.errors.Precio}</span>
                  </div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese una descripcion"
                  min={15}
                  max={50}
                  {...formik.getFieldProps("Descripcion")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid":
                        formik.touched.Descripcion && formik.errors.Descripcion,
                    },
                    {
                      "is-valid":
                        formik.touched.Descripcion &&
                        !formik.errors.Descripcion,
                    }
                  )}
                />
                {formik.touched.Descripcion && formik.errors.Descripcion && (
                  <div>
                    <span className="text-danger">
                      {formik.errors.Descripcion}
                    </span>
                  </div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="Imagen"
                  onChange={(e) => {
                    formik.setFieldValue("Imagen", e.currentTarget.files[0])
                  }}
                />
                {formik.touched.Imagen && formik.errors.Imagen && (
                  <div>
                    <span className="text-danger">
                      {formik.errors.Imagen}
                    </span>
                  </div>
                )}
              </Form.Group>
            </Stack>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CrearComida;
