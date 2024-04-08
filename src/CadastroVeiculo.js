import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import NavBar from './Navbar'
import Footer from './Footer'
import './CadastroVeiculo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { FaTag, FaTrademark, FaCarAlt, FaCalendarAlt, FaPaintBrush, FaTachometerAlt, FaCarSide } from 'react-icons/fa';
import BackButton from './Components/BackButton';
import SaveButton from './Components/SaveButton';
import ClearButton from './Components/ClearButton';
import PesquisaVeiculosModal from './Components/PesquisaVeiculosModal';
import { API_BASE_URL } from './config';
import {showMessageSuccess, showMessageWarn, showMessageInfo} from './utils.js';
import useButtonState from './Components/useButtonState.js';

const CadastroVeiculo = () => { 

    const [showModal, setShowModal] = useState(false);

    const [placa, setPlaca] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [cor, setCor] = useState('');
    const [km_atual, setkm_atual] = useState('');
    const [tipo, setTipo] = useState('');

    const { isSaveButtonEnabled, isClearButtonEnabled } = useButtonState(placa, marca, modelo, ano, cor, km_atual, tipo);


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

    const handleAnoChange = (event) => {
      const valor = event.target.value;
      const anoFormatado = valor.slice(0, 4); 
      setAno(anoFormatado);
    };

    const handleVeiculoChange = (event) => {
        setTipo(event.target.value);
    };

    const isFormValid = () => {
        return placa && marca && modelo && ano && cor && km_atual && tipo;
    };

    const adicionarVeiculo = async () => {
        try {
            const veiculo = {
                placa: placa,
                marca: marca,
                modelo: modelo,
                ano: parseInt(ano, 10),
                cor: cor,
                km_atual: parseInt(km_atual, 10),
                tipo: tipo
            };
    
            const response = await fetch(`${API_BASE_URL}/veiculos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(veiculo)
            });
    
            if (response.ok) {
                showMessageSuccess("Veículo adicionado com sucesso!");
                console.log('Veículo adicionado com sucesso!');
            } else {
                console.error('Falha ao adicionar veículo');
            }
        } catch (error) {
            console.error('Erro ao adicionar veículo:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()) {
            adicionarVeiculo();
            handleClear();
        } else {
            showMessageWarn('Por favor, preencha todos os campos do formulário.');
        }
    };

    const handleClear = () => {
        setPlaca('');
        setMarca('');
        setModelo('');
        setAno('');
        setCor('');
        setkm_atual('');
        setTipo('');
    };    

    const toUpperCaseAndLimit = (value) => {
        return value.toUpperCase().slice(0, 30);
    };    

    // useEffect(() => {
    //     const isAnyFieldFilled = placa.trim() || marca.trim() || modelo.trim() || ano.trim() || cor.trim() || km_atual.trim() || tipo.trim();
    //     setIsSaveButtonEnabled(isAnyFieldFilled);
    //     setIsClearButtonEnabled(isAnyFieldFilled);
    // }, [placa, marca, modelo, ano, cor, km_atual, tipo]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        const formattedValue = toUpperCaseAndLimit(value);

        switch (id) {
            case 'formPlaca':
                setPlaca(formatarPlaca(value));
                break;
            case 'formMarca':
                setMarca(formattedValue);
                break;
            case 'formModelo':
                setModelo(formattedValue);
                break;
            case 'formAno':
                setAno(value);
                break;
            case 'formCor':
                setCor(formattedValue);
                break;
            case 'formKmAtual':
                setkm_atual(value);
                break;
            case 'formTipoVeiculo':
                setTipo(value);
                break;
            default:
                break;
        }

        // const isAnyFieldFilled = placa.trim() || marca.trim() || modelo.trim() || ano.trim() || cor.trim() || km_atual.trim() || tipo.trim();
        // setIsSaveButtonEnabled(isAnyFieldFilled);
        // setIsClearButtonEnabled(isAnyFieldFilled);
    };
    
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
    }, []);

    
  return (
    <Container fluid style={{ backgroundColor: '#f2f8fb'}}>
       <NavBar title="Gerenciador de Manutenções" />
        <Container style={{ marginTop: '20px'}}>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Cadastro de Veículo</Card.Title>
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
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Insira a marca do veículo" 
                                                value={marca}
                                                onChange={handleChange} 
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className='mb-3' controlId="formModelo">
                                            <Form.Label><FaCarAlt /> Modelo</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Insira o modelo do veículo" 
                                                value={modelo}
                                                onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                    <Form.Group className='mb-3' controlId="formAno">
                                        <Form.Label><FaCalendarAlt /> Ano</Form.Label>
                                        <Form.Control
                                            type="text" 
                                            pattern="\d*" 
                                            placeholder="Insira o ano do veículo"
                                            value={ano}
                                            onChange={handleAnoChange}
                                            maxLength="4"
                                        />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className='mb-3' controlId="formCor">
                                            <Form.Label><FaPaintBrush /> Cor</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Insira a cor do veículo" 
                                                value={cor}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className='mb-3' controlId="formKmAtual">
                                            <Form.Label><FaTachometerAlt /> Quilometragem Atual</Form.Label>
                                            <Form.Control 
                                                type="number" 
                                                placeholder="Insira a quilometragem atual" 
                                                value={km_atual}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className='mb-3' controlId="formTipoVeiculo">
                                            <Form.Label><FaCarSide /> Tipo</Form.Label>
                                            <Form.Control 
                                                as="select" 
                                                value={tipo} 
                                                onChange={(event) => {
                                                    handleVeiculoChange(event);
                                                    handleChange(event);
                                                }}
                                                className="custom-select"
                                            >
                                                <option value="">Selecione o tipo de veículo</option>
                                                <option value="carro">Carro</option>
                                                <option value="moto">Moto</option>
                                                <option value="caminhao">Caminhão</option>
                                                <option value="outro">Outro</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>   
                            </Form>
                            <div className="d-flex justify-content-between">
                                <Button onClick={() => setShowModal(true)}>Pesquisar Veículos</Button>
                                <PesquisaVeiculosModal
                                    show={showModal}
                                    onHide={() => setShowModal(false)}
                                />
                                <div>
                                    <SaveButton onSave={handleSubmit} isDisabled={!isSaveButtonEnabled} />
                                    <ClearButton onClear={handleClear} isDisabled={!isClearButtonEnabled} />
                                </div>
                            </div>     
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