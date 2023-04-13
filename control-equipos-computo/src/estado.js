import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Estado() {
    const [estados, setEstados] = useState([]);

    const [show, setShow] = useState(false);
    const [titulo, setTitulo] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setTitulo('Crear');
    };

    const showModal = (estadoId, modo) => {
        const estado = estados.find((estado) => estado.id === estadoId);
        setTitulo(modo);
        values.id = estado.id;
        values.nombre = estado.nombre;
        setShow(true);
    }

    const [validated, setValidated] = useState(false);

    const [values, setValues] = useState({
        id: 0,
        nombre: ""
    });

    const handleChange = (event) => {
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
                "nombre": values.nombre
            });

            requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:6173/api/estados/" + values.id, requestOptions)
                .then(response => response.text())
                .then(result => {
                    cargarEstados();
                    values.id = 0;
                    values.nombre = "";
                    handleClose();
                })
                .catch(error => console.log('error', error));
        } else {

            raw = JSON.stringify({
                nombre: values.nombre
            });

            requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:6173/api/estados", requestOptions)
                .then(response => response.json())
                .then(result => {
                    cargarEstados();
                    values.nombre = "";
                    handleClose();
                })
                .catch(error => console.log('error', error));
        }
    };

    const cargarEstados = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:6173/api/estados", requestOptions)
            .then(response => response.json())
            .then(data => setEstados(data));
    };

    useEffect(() => {
        cargarEstados();
    }, []);

    return (
        <div>
            <h1>Estados</h1>
            <br></br>
            <Button variant="success" onClick={handleShow}>Crear</Button>
            <br></br>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        estados.map(estado => (
                            <tr key={estado.id}>
                                <td>{estado.id}</td>
                                <td>{estado.nombre}</td>
                                <td><Button variant="warning" onClick={() => showModal(estado.id, 'Editar')}>Editar</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Estado - {titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>Nombre estado</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del nuevo estado"
                                autoFocus
                                required
                                name="nombre"
                                value={values.nombre}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Digite un valor para el nombre de estado.
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

export default Estado;
