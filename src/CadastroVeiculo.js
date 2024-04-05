import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import NavBar from './Navbar'
import Footer from './Footer'
import './CadastroVeiculo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { FaTag, FaTrademark, FaCarAlt, FaCalendarAlt, FaPaintBrush, FaTachometerAlt, FaCarSide } from 'react-icons/fa';
import BackButton from './Components/BackButton';

const CadastroVeiculo = () => { 
    
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);
    
  return (
    <Container fluid style={{ backgroundColor: '#f2f8fb'}}>
       <NavBar title="Gerenciador de Manutenções" />
        <Container style={{ marginTop: '20px'}}>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center mb-5">Cadastro de Veículo</Card.Title>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className='mb-3' controlId="formPlaca">
                                            <Form.Label><FaTag /> Placa</Form.Label>
                                            <Form.Control type="text" placeholder="Insira a placa do veículo" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className='mb-3' controlId="formMarca">
                                            <Form.Label><FaTrademark /> Marca</Form.Label>
                                            <Form.Control type="text" placeholder="Insira a marca do veículo" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className='mb-3' controlId="formModelo">
                                            <Form.Label><FaCarAlt /> Modelo</Form.Label>
                                            <Form.Control type="text" placeholder="Insira o modelo do veículo" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className='mb-3' controlId="formAno">
                                            <Form.Label><FaCalendarAlt /> Ano</Form.Label>
                                            <Form.Control type="number" placeholder="Insira o ano do veículo" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className='mb-3' controlId="formCor">
                                            <Form.Label><FaPaintBrush /> Cor</Form.Label>
                                            <Form.Control type="text" placeholder="Insira a cor do veículo" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className='mb-3' controlId="formKmAtual">
                                            <Form.Label><FaTachometerAlt /> Quilometragem Atual</Form.Label>
                                            <Form.Control type="number" placeholder="Insira a quilometragem atual" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formTipo">
                                            <Form.Label><FaCarSide /> Tipo</Form.Label>
                                            <Form.Control as="select">
                                                <option>Carro</option>
                                                <option>Moto</option>
                                                <option>Caminhão</option>
                                                <option>Outro</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit" className='mt-4'>
                                    Cadastrar Veículo
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Container className='mt-4 text-center'>
            <BackButton backPath="/Home" />
        </Container>
        <Container>
            <Footer/>
        </Container>
    </Container>
  );
}

export default CadastroVeiculo;