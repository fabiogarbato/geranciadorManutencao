import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import NavBar from '../Components/Navbar.js'
import Footer from '../Components/Footer.js'
import './CadastroVeiculo.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
import {
    FaCalendar, 
    FaRegEdit, 
    FaMoneyBillWave,
    FaTag,
    FaTrademark,
    FaCarAlt,
    FaCalendarAlt
} from 'react-icons/fa'
import BackButton from '../Components/BackButton.js'
import SaveButton from '../Components/SaveButton.js'
import ClearButton from '../Components/ClearButton.js'
import { API_BASE_URL } from '../config.js'
import { showMessageError, showMessageSuccess, showMessageWarn } from '../utils.js'
import useButtonState from '../Components/useButtonState.js'
import PesquisaVeiculosModal from '../Components/PesquisaVeiculosModal.js'
import axios from 'axios'

const HistoricoManutencao = () => {

    const [veiculoId, setVeiculoId] = useState(null);
    const [placa, setPlaca] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [ano, setAno] = useState('')
    const [data_manutencao, setData_manutencao] = useState('')
    const [detalhes, setDetalhes] = useState('')
    const [custo, setCusto] = useState('')

    const { isSaveButtonEnabled, isClearButtonEnabled } = useButtonState(
        placa,
        marca,
        modelo,
        ano,
        data_manutencao,
        detalhes,
        custo
      )

    const [isUpdating, setIsUpdating] = useState(false)
    const [isPlacaDisabled, setIsPlacaDisabled] = useState(false);

    const handleAnoChange = (event) => {
        const valor = event.target.value;
        const apenasNumeros = valor.replace(/\D/g, ''); 
        if (apenasNumeros.length <= 4) {
          setAno(apenasNumeros); 
        }
      };  
    
    const formatarPlaca = (valor) => {
        const valorSemFormatacao = valor.replace(/[^A-Z0-9]/gi, '').toUpperCase()
        if (valorSemFormatacao.length <= 3) {
          return valorSemFormatacao
        }
        if (valorSemFormatacao.length === 7) {
          return (
            valorSemFormatacao.slice(0, 3) + '-' + valorSemFormatacao.slice(3, 7)
          )
        }
        return valorSemFormatacao.slice(0, 3) + '-' + valorSemFormatacao.slice(3, 6)
      }

    const toUpperCaseAndLimit = (value) => {
        return value.toUpperCase().slice(0, 30)
    }

    const pesquisarPlaca = async () => {
        try {
          const endpoint = `/veiculos/search?search=${encodeURIComponent(placa)}`;
          const response = await fetch(`${API_BASE_URL}${endpoint}`);
          const data = await response.json();
          
          if (data.length > 0) {
            const veiculo = data[0]; 
            setMarca(veiculo.marca);
            setModelo(veiculo.modelo);
            setAno(veiculo.ano);
            setVeiculoId(veiculo.id);
            setIsPlacaDisabled(true);
          }
        } catch (error) {
          console.error('Erro ao buscar veículo:', error);
        }
    };
    
    const handleChange = (event) => {
        const { id, value } = event.target
        const formattedValue = toUpperCaseAndLimit(value)

        switch (id) {
            case 'formPlaca':
                setPlaca(formatarPlaca(value));
                if (value === '') {
                  setIsPlacaDisabled(false); 
                }
                break;
          case 'formMarca':
            setMarca(formattedValue)
            break
          case 'formModelo':
            setModelo(formattedValue)
            break
          case 'formAno':
            setAno(value)
            break
          case 'formDataManutencao':
            setData_manutencao(value)
            break
          case 'formDetalhes':
            setDetalhes(value)
            break
          case 'formCusto':
            setCusto(value)
            break
          default:
            break
        }
    }

    const handleClear = () => {
        setIsUpdating(false)
        setIsPlacaDisabled(false);
        setPlaca('')
        setMarca('')
        setModelo('')
        setAno('')
        setData_manutencao('')
        setDetalhes('')
        setCusto('')
    }

    const adicionarHistoricoManutencao = async () => {
        const novoHistorico = {
            veiculo_id: veiculoId,
            data_manutencao: data_manutencao,
            detalhes: detalhes,
            custo: custo
        };
    
        try {
            const response = await fetch(`${API_BASE_URL}/historicoManutencao`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoHistorico)
            });
    
            if (response.ok) {
                const data = await response.json();
                showMessageSuccess('Histórico de manutenção criado:', data);
            } else {
                showMessageError('Erro ao criar histórico de manutenção:', await response.text());
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    const isFormComplete = () => {
        return placa && marca && modelo && ano && data_manutencao && detalhes && custo
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isFormComplete()) { 
            await adicionarHistoricoManutencao();
            handleClear();
        } else {
            showMessageWarn('Por favor, preencha todos os campos do formulário.');
        }
    };

    useEffect(() => {
        document.body.style.overflowY = 'hidden'
    }, [])

  return (
    <Container fluid style={{ backgroundColor: '#f2f8fb' }}>
        <NavBar title="Gerenciador de Manutenções" />
        <Container className="mt-5">
            <Card>
                <Card.Header>
                    <h2>Histórico de Manutenção</h2>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Row>
                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="formPlaca">
                                    <Form.Label>
                                        <FaTag /> Placa
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Insira a placa do veículo"
                                        value={placa}
                                        onChange={handleChange}
                                        onKeyPress={(e) => e.key === 'Enter' && pesquisarPlaca()}
                                        maxLength="8"
                                        disabled={isPlacaDisabled}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="formMarca">
                                    <Form.Label>
                                        <FaTrademark /> Marca
                                    </Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="Marca"
                                    disabled="true"
                                    value={marca}
                                    onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="formModelo">
                                    <Form.Label>
                                        <FaCarAlt /> Modelo
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Modelo"
                                        disabled="true"
                                        value={modelo}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="formAno">
                                    <Form.Label>
                                        <FaCalendarAlt /> Ano
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Insira o ano do veículo"
                                        disabled="true"
                                        value={ano}
                                        onChange={handleAnoChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formDataManutencao">
                            <Form.Label>
                                <FaCalendar /> Data da Manutenção
                            </Form.Label>
                            <Form.Control 
                                type="date" 
                                value={data_manutencao}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDetalhes">
                            <Form.Label>
                                <FaRegEdit /> Descrição
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Descreva a manutenção realizada" 
                                value={detalhes}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCusto">
                            <Form.Label>
                                <FaMoneyBillWave /> Custo (R$)
                            </Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Informe o custo da manutenção" 
                                value={custo}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <div>
                            <SaveButton
                                onSave={handleSubmit}
                                isDisabled={!isSaveButtonEnabled}
                            />
                            <ClearButton
                                onClear={handleClear}
                                isDisabled={!isClearButtonEnabled}
                            />
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        <Container className="mt-4 text-center">
            <BackButton
                backPath="/Home"
                shouldConfirm={isSaveButtonEnabled || isClearButtonEnabled}
            />
      </Container>
        <Container>
            <Footer />
        </Container>
    </Container>
  )
}

export default HistoricoManutencao 
