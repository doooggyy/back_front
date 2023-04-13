import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function TipoEquipo() {
    const [tipos, setTipos] = useState([]);

    const [show, setShow] = useState(false);
    const [titulo, setTitulo] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setTitulo('Crear');
    };

    const showModal = (tipoId, modo) => {
        const tipo = tipos.find((tipo) => tipo.id === tipoId);
        setTitulo(modo);
        values.id = tipo.id;
        values.nombre = tipo.nombre;
        values.estado = tipo.estado;
        setShow(true);
    }

    const [validated, setValidated] = useState(false);

    const [values, setValues] = useState({
        id: 0,
        nombre: "",
        estado: ""
    });

    const handleChangeNombreTipo = (event) => {
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

            fetch("http://localhost:6173/api/tipos/" + values.id, requestOptions)
                .then(response => response.text())
                .then(result => {
                    cargarTipos();
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

            fetch("http://localhost:6173/api/tipos", requestOptions)
                .then(response => response.json())
                .then(result => {
                    cargarTipos();
                    values.nombre = "";
                    handleClose();
                })
                .catch(error => console.log('error', error));
        }
    };

    const cargarTipos = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:6173/api/tipos", requestOptions)
            .then(response => response.json())
            .then(data => setTipos(data));
    };

    useEffect(() => {
        cargarTipos();
    }, []);

    return (
        <div>
            <h1>Tipos</h1>
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
                        tipos.map(tipo => (
                            <tr key={tipo.id}>
                                <td>{tipo.id}</td>
                                <td>{tipo.nombre}</td>
                                <td>{tipo.estado}</td>
                                <td><Button variant="warning" onClick={() => showModal(tipo.id, 'Editar')}>Editar</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tipo - {titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>Nombre tipo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del nuevo tipo"
                                autoFocus
                                required
                                name="nombre"
                                value={values.nombre}
                                onChange={handleChangeNombreTipo}
                            />
                            <Form.Control.Feedback type="invalid">
                                Digite un valor para el nombre del tipo.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="estado">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del estado del equipo"
                                autoFocus
                                required
                                name="estado"
                                value={values.estado}
                                onChange={handleChangeEstado}
                            />
                            <Form.Control.Feedback type="invalid">
                                Digite un valor para el estado del equipo.
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

export default TipoEquipo;
