import {Link} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BarraNavegacion() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Control Equipos de Cómputo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Inicio</Link>
                        <NavDropdown title="Tipos equipo" id="basic-nav-dropdown">
                            <Link to="/tipo-equipo" className="dropdown-item">Listar</Link>
                        </NavDropdown>
                        <NavDropdown title="Usuarios" id="basic-nav-dropdown">
                            <Link to="/usuarios" className="dropdown-item">Listar</Link>
                        </NavDropdown>
                        <NavDropdown title="Marcas" id="basic-nav-dropdown">
                            <Link to="/marcas" className="dropdown-item">Listar</Link>
                        </NavDropdown>
                        <NavDropdown title="Estados" id="basic-nav-dropdown">
                            <Link to="/estado" className="dropdown-item">Listar</Link>
                        </NavDropdown>
                        <Link to="/inicio-sesion" className="nav-link">Inicio sesión</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BarraNavegacion;
