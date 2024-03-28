import './index.css';
import { Container, Row, Col, Button, Card, Nav } from 'react-bootstrap';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './Navbar';
import { FaMap, FaPlane, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from './AuthProvider';

const App = () => {  

    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        navigate('/');
    };

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

  return (
    <Container fluid style={{ backgroundColor: 'white' }}>
      <NavBar title="Gerenciador de Manutenções" />
        <Row>
            <Col md={3} lg={2} className="d-none d-md-block bg-light sidebar">
                <Nav defaultActiveKey="/home" className="flex-column pt-2">
                    <Nav.Link as={Link} to="/MapMenu" className="nav-link text-primary custom-logout-link">
                        <FaMap /> Mapeador
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Migrador" className="nav-link text-primary custom-logout-link">
                        <FaPlane /> Migrador
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Relatorio" className="nav-link text-primary custom-logout-link">
                        <FaChartLine /> Relatório
                    </Nav.Link>
                    <Nav.Link as={Link} onClick={handleLogout} className="nav-link text-danger custom-logout-link">
                        <FaSignOutAlt /> Sair
                    </Nav.Link>
                </Nav>
            </Col>
            <Col md={9} lg={10} className="p-3">
                
            </Col>
      </Row>
      <Footer/>
    </Container>
  );
}

export default App;
