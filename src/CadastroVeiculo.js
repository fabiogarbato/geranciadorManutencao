import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import NavBar from './Navbar'
import Footer from './Footer'
import './CadastroVeiculo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { FaTag, FaTrademark, FaCarAlt, FaCalendarAlt, FaPaintBrush, FaTachometerAlt, FaCarSide } from 'react-icons/fa';
import BackButton from './Components/BackButton';

const CadastroVeiculo = () => { 
    
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

    const [placa, setPlaca] = useState('');

    const formatarPlaca = (valor) => {
        const valorSemFormatacao = valor.replace(/[^A-Z0-9]/gi, '').toUpperCase();
        if (valorSemFormatacao.length <= 3) {
        return valorSemFormatacao;
        }
        if (valorSemFormatacao.length === 7) {
        return valorSemFormatacao.slice(0, 3) + '-' + valorSemFormatacao.slice(3, 7);
        }
        return valorSemFormatacao.slice(0, 3) + '-' + valorSemFormatacao.slice(3, 6);
    };

    const handleChange = (event) => {
        const valorFormatado = formatarPlaca(event.target.value);
        setPlaca(valorFormatado);
    };
    
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
                                            <Form.Control
                                                type="text"
                                                placeholder="Insira a placa do veículo"
                                                value={placa}
                                                onChange={handleChange}
                                                maxLength="8"
                                            />
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