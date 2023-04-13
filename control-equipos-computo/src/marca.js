import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Marca() {
    const [marcas, setMarcas] = useState([]);

    const [show, setShow] = useState(false);
    const [titulo, setTitulo] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setTitulo('Crear');
    };

    const showModal = (marcaId, modo) => {
        const marca = marcas.find((marca) => marca.id === marcaId);
        setTitulo(modo);
        values.id = marca.id;
        values.nombre = marca.nombre;
        values.estado = marca.estado;
        setShow(true);
    }

    const [validated, setValidated] = useState(false);

    const [values, setValues] = useState({
        id: 0,
        nombre: "",
        estado: ""
    });

    const handleChangeNombre = (event) => {
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };
    const handleChangeEstado = (event) => {
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
        myHeaders.append("Content-Type", "application/json");
        let raw = null;
        let requestOptions = null;

        if (values.id !== 0) {

            raw = JSON.stringify({
                "nombre": values.nombre,
                "estado": values.estado
            });

            requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:6173/api/marcas/" + values.id, requestOptions)
                .then(response => response.text())
                .then(result => {
                    cargarMarcas();
                    values.id = 0;
                    values.nombre = "";
                    handleClose();
                })
                .catch(error => console.log('error', error));
        } else {

            raw = JSON.stringify({
                nombre: values.nombre,
                estado: values.estado
            });

            requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:6173/api/marcas", requestOptions)
                .then(response => response.json())
                .then(result => {
                    cargarMarcas();
                    values.nombre = "";
                    handleClose();
                })
                .catch(error => console.log('error', error));
        }
    };

    const cargarMarcas = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:6173/api/marcas", requestOptions)
            .then(response => response.json())
            .then(data => setMarcas(data));
    };

    useEffect(() => {
        cargarMarcas();
    }, []);

    return (
        <div>
            <h1>Marcas</h1>
            <br></br>
            <Button variant="success" onClick={handleShow}>Crear</Button>
            <br></br>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        marcas.map(marca => (
                            <tr key={marca.id}>
                                <td>{marca.id}</td>
                                <td>{marca.nombre}</td>
                                <td>{marca.estado}</td>
                                <td><Button variant="warning" onClick={() => showModal(marca.id, 'Editar')}>Editar</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Marca - {titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>Nombre marca</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de la nueva marca"
                                autoFocus
                                required
                                name="nombre"
                                value={values.nombre}
                                onChange={handleChangeNombre}
                            />
                            <Form.Control.Feedback type="invalid">
                                Digite un valor para el nombre de la marca.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="estado">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del estado de la marca"
                                autoFocus
                                required
                                name="estado"
                                value={values.estado}
                                onChange={handleChangeEstado}
                            />
                            <Form.Control.Feedback type="invalid">
                                Digite un valor para el estado de la marca.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit">Guardar</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default Marca;
