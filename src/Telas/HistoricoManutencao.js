import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import NavBar from '../Components/Navbar.js'
import Footer from '../Components/Footer.js'
import './CadastroVeiculo.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
import {
  FaTag,
  FaTrademark,
  FaCarAlt,
  FaCalendarAlt,
  FaPaintBrush,
  FaTachometerAlt,
  FaCarSide,
} from 'react-icons/fa'
import BackButton from '../Components/BackButton.js'
import SaveButton from '../Components/SaveButton.js'
import ClearButton from '../Components/ClearButton.js'
import { API_BASE_URL } from '../config.js'
import { showMessageSuccess, showMessageWarn } from '../utils.js'
import useButtonState from '../Components/useButtonState.js'
import PesquisaVeiculosModal from '../Components/PesquisaVeiculosModal.js'
import axios from 'axios'

const HistoricoManutencao = () => {

    const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);
    const [veiculos, setVeiculos] = useState([]);

    const carregarVeiculos = async (termoPesquisa = '') => {
        try {
          const response = await axios.get(`${API_BASE_URL}/veiculos/search`, {
            params: {
              search: termoPesquisa,
            },
          });
          setVeiculos(response.data);
        } catch (error) {
          console.error('Erro ao carregar veículos:', error);
        }
      };  
    
    useEffect(() => {
      carregarVeiculos();
    }, []);
  
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
                        <Form.Group className="mb-3">
                            <Form.Label>Veículo</Form.Label>
                            <Form.Select
                                value={veiculoSelecionado}
                                onChange={(e) => setVeiculoSelecionado(e.target.value)}
                            >
                                <option>Selecione um veículo</option>
                                {veiculos.map((veiculo) => (
                                <option key={veiculo.id} value={veiculo.id}>
                                    {veiculo.placa} - {veiculo.modelo}
                                </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Data da Manutenção</Form.Label>
                        <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descrição</Form.Label>
                        <Form.Control type="text" placeholder="Descreva a manutenção realizada" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Custo (R$)</Form.Label>
                        <Form.Control type="number" placeholder="Informe o custo da manutenção" />
                        </Form.Group>
                        <div>
                            <SaveButton
                                // onSave={handleSubmit}
                                // isDisabled={!isSaveButtonEnabled}
                            />
                            <ClearButton
                                // onClear={handleClear}
                                // isDisabled={!isClearButtonEnabled}
                            />
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        <Container className="mt-4 text-center">
            <BackButton
            backPath="/Home"
            // shouldConfirm={isSaveButtonEnabled || isClearButtonEnabled}
            />
      </Container>
        <Container>
            <Footer />
        </Container>
    </Container>
  )
}

export default HistoricoManutencao 
