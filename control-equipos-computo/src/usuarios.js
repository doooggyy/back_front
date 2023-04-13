import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Usuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);

    const [show, setShow] = useState(false);
    const [titulo, setTitulo] = useState("");

    const handleClose = () => {
        setShow(false)
        limpiarCampos();
    };
    const handleShow = () => {
        setShow(true);
        setTitulo('Crear');
    };

    const limpiarCampos = () => {
        values.id = 0;
        values.nombre = "";
        values.email = "";
        values.password = "";
        values.estado = "";
        values.rol_id = 0;
    }

    const showModal = (usuarioId, modo) => {
        const usuario = usuarios.find((usuario) => usuario.id === usuarioId);
        setTitulo(modo);
        values.id = usuario.id;
        values.nombre = usuario.nombre;
        values.email = usuario.email;
        values.password = usuario.password;
        values.estado = usuario.estado;
        values.rol_id = usuario.rolId;
        setShow(true);
    }

    const [validated, setValidated] = useState(false);

    const [values, setValues] = useState({
        id: 0,
        nombre: "",
        email: "",
        password: "",
        estado: "",
        rol_id: 0
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
        let requestOptions = null;
        const raw = JSON.stringify({
            "nombre": values.nombre,
            "email": values.email,
            "password": values.password,
            "estado": values.estado,
            "rolId": values.rol_id
        });
        
        if (values.id !== 0) {


            requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:6173/api/usuarios/" + values.id, requestOptions)
                .then(response => response.text())
                .then(result => {
                    cargarUsuarios();
                    limpiarCampos();
                    handleClose();
                })
                .catch(error => console.log('error', error));
        } else {
            requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:6173/api/usuarios", requestOptions)
                .then(response => response.json())
                .then(result => {
                    cargarUsuarios();
                    limpiarCampos();
                    handleClose();
                })
                .catch(error => console.log('error', error));
        }
    };

    const cargarUsuarios = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:6173/api/usuarios", requestOptions)
            .then(response => response.json())
            .then(data => setUsuarios(data));
    };
    
    const cargarRoles = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:6173/api/roles", requestOptions)
            .then(response => response.json())
            .then(data => setRoles(data));
    };

    useEffect(() => {
        cargarUsuarios();
        cargarRoles();
    }, []);

    return (
        <div>
            <h1>Usuarios</h1>
            <br></br>
            <Button variant="success" onClick={handleShow}>Crear</Button>
            <br></br>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.email}</td>
                                <td>************</td>
                                <td>{usuario.estado}</td>
                                <td><Button variant="warning" onClick={() => showModal(usuario.id, 'Editar')}>Editar</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Usuario - {titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>Nombre del usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del usuario"
                                autoFocus
                                required
                                name="nombre"
                                value={values.nombre}
                                onChange={handleChangeNombre}
                            />
                            <Form.Control.Feedback type="invalid">
                                Digite un valor para el nombre del usuario.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email del usuario</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email del usuario"
                                autoFocus
                                required
                                name="email"
                                value={values.email}
                                onChange={handleChangeNombre}
                            />
                            <Form.Control.Feedback type="invalid">
                                Digite un valor para el email del usuario.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Password del usuario</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password del usuario"
                                autoFocus
                                required
                                name="password"
                                value={values.password}
                                onChange={handleChangeNombre}
                            />
                            <Form.Control.Feedback type="invalid">
                                Digite un valor para el password del usuario.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="estado">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del estado del usuario"
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
                        <Form.Group className="mb-3" controlId="rolId">
                            <Form.Label>Rol</Form.Label>
                            <Form.Select
                                autoFocus
                                required
                                name="estado"
                                value={values.rol_id}
                                onChange={handleChangeEstado}
                            >
                                {
                                    roles.map(rol => (
                                        <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                                    ))
                                }
                            </Form.Select>
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

export default Usuario;
