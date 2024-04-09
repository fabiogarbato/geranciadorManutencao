import './index.css'
import { Container, Row, Col, Offcanvas, Nav } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import NavBar from '../Components/Navbar'
import {
  FaSignOutAlt,
  FaBars,
  FaCalendarAlt,
  FaHistory,
  FaMoneyBillWave,
  FaClipboardList,
  FaBell,
  FaCogs,
  FaFileAlt,
  FaCar,
  FaCog,
} from 'react-icons/fa'
import { useAuth } from '../AuthProvider'

const App = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuth()

  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
    navigate('/')
  }

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])

  return (
    <Container fluid style={{ backgroundColor: '#f2f8fb' }}>
      <NavBar title="Gerenciador de Manutenções" />
      <Row>
        <Col md={12} lg={2} className="d-none d-md-block bg-light sidebar">
          <Nav defaultActiveKey="/home" className="flex-column pt-2">
            <Nav.Link
              as={Link}
              to="/Agendamento"
              className="nav-link text-primary custom-logout-link"
            >
              <FaCalendarAlt /> Agendamento de Manutenção
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Historico"
              className="nav-link text-primary custom-logout-link"
            >
              <FaHistory /> Histórico de Manutenção
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Custos"
              className="nav-link text-primary custom-logout-link"
            >
              <FaMoneyBillWave /> Controle de Custos
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Checklist"
              className="nav-link text-primary custom-logout-link"
            >
              <FaClipboardList /> Lista de Verificação
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Lembretes"
              className="nav-link text-primary custom-logout-link"
            >
              <FaBell /> Lembretes
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Pecas"
              className="nav-link text-primary custom-logout-link"
            >
              <FaCogs /> Peças e Acessórios
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Relatorios"
              className="nav-link text-primary custom-logout-link"
            >
              <FaFileAlt /> Relatórios
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Configuracoes"
              className="nav-link text-primary custom-logout-link"
            >
              <FaCog /> Configurações
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/CadastroVeiculo"
              className="nav-link text-primary custom-logout-link"
            >
              <FaCar /> Cadastrar Veículo
            </Nav.Link>
            <Nav.Link
              as={Link}
              onClick={handleLogout}
              className="nav-link text-danger custom-logout-link"
            >
              <FaSignOutAlt /> Sair
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
      <button className="btn btn-primary d-md-none" onClick={handleShow}>
        <FaBars />
      </button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column pt-2">
            <Nav.Link
              as={Link}
              to="/Agendamento"
              className="nav-link text-primary custom-logout-link"
            >
              <FaCalendarAlt /> Agendamento de Manutenção
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Historico"
              className="nav-link text-primary custom-logout-link"
            >
              <FaHistory /> Histórico de Manutenção
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Custos"
              className="nav-link text-primary custom-logout-link"
            >
              <FaMoneyBillWave /> Controle de Custos
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Checklist"
              className="nav-link text-primary custom-logout-link"
            >
              <FaClipboardList /> Lista de Verificação
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Lembretes"
              className="nav-link text-primary custom-logout-link"
            >
              <FaBell /> Lembretes
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Pecas"
              className="nav-link text-primary custom-logout-link"
            >
              <FaCogs /> Peças e Acessórios
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Relatorios"
              className="nav-link text-primary custom-logout-link"
            >
              <FaFileAlt /> Relatórios
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Configuracoes"
              className="nav-link text-primary custom-logout-link"
            >
              <FaCog /> Configurações
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/CadastroVeiculo"
              className="nav-link text-primary custom-logout-link"
            >
              <FaCar /> Cadastrar Veículo
            </Nav.Link>
            <Nav.Link
              as={Link}
              onClick={handleLogout}
              className="nav-link text-danger custom-logout-link"
            >
              <FaSignOutAlt /> Sair
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <Footer />
    </Container>
  )
}

export default App
