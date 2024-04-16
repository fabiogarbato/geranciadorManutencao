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
  FaCalendarAlt,
} from 'react-icons/fa'
import BackButton from '../Components/BackButton.js'
import SaveButton from '../Components/SaveButton.js'
import ClearButton from '../Components/ClearButton.js'
import { API_BASE_URL } from '../config.js'
import {
  showMessageError,
  showMessageInfo,
  showMessageSuccess,
  showMessageWarn,
} from '../utils.js'
import useButtonState from '../Components/useButtonState.js'
import PesquisaManutencoesModal from '../Components/PesquisaManutencoesModal.js'

const HistoricoManutencao = () => {
  const [showModal, setShowModal] = useState(false)
  const [veiculoId, setVeiculoId] = useState(null)
  const [manutencaoId, setManutencaoId] = useState(null)
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
    custo,
  )

  
  const [isPlacaDisabled, setIsPlacaDisabled] = useState(false)
  
  const [isUpdating, setIsUpdating] = useState(false)

  const handleManutencaoSelect = (manutencao, veiculo) => {  
    if (!veiculo) {
      showMessageError("Nenhum veículo disponível!");
      return;  
    }

    setIsUpdating(true)
    setPlaca(veiculo.placa)
    setMarca(veiculo.marca);  
    setModelo(veiculo.modelo);
    setAno(veiculo.ano);
    setData_manutencao(manutencao.data_manutencao.split("T")[0]); 
    setDetalhes(manutencao.detalhes);
    setCusto(manutencao.custo);
    setIsPlacaDisabled(true)
    setManutencaoId(manutencao.id)
    setShowModal(false); 
    showMessageInfo("Manutenção do veiculo: " + modelo + " selecionada");
  };
  
  const handleAnoChange = (event) => {
    const valor = event.target.value
    const apenasNumeros = valor.replace(/\D/g, '')
    if (apenasNumeros.length <= 4) {
      setAno(apenasNumeros)
    }
  }

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
      const endpoint = `/veiculos/search?search=${encodeURIComponent(placa)}`
      const response = await fetch(`${API_BASE_URL}${endpoint}`)
      const data = await response.json()

      if (data.length > 0) {
        const veiculo = data[0]
        setMarca(veiculo.marca)
        setModelo(veiculo.modelo)
        setAno(veiculo.ano)
        setVeiculoId(veiculo.id)
        setIsPlacaDisabled(true)
      }
    } catch (error) {
      console.error('Erro ao buscar veículo:', error)
    }
  }

  const handleChange = (event) => {
    const { id, value } = event.target
    const formattedValue = toUpperCaseAndLimit(value)

    switch (id) {
      case 'formPlaca':
        setPlaca(formatarPlaca(value))
        if (value === '') {
          setIsPlacaDisabled(false)
        }
        break
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
    setIsPlacaDisabled(false)
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
      custo: custo,
    }

    try {
      const response = await fetch(`${API_BASE_URL}/historicoManutencao`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoHistorico),
      })

      if (response.ok) {
        const data = await response.json()
        showMessageSuccess('Histórico de manutenção criado:', data)
      } else {
        showMessageError(
          'Erro ao criar histórico de manutenção:',
          await response.text(),
        )
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error)
    }
  }

  async function atualizaHistoricoManutencao() {
    const dadosManutencao = {
      placa: placa,
      marca: marca,
      modelo: modelo,
      ano: parseInt(ano, 10),
      data_manutencao: data_manutencao.split("T")[0],
      detalhes: detalhes,
      custo: parseFloat(custo)
    };
  
    try {
      const response = await fetch(`${API_BASE_URL}/historicoManutencao/${manutencaoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosManutencao)
      });
  
      if (response.ok) {
        const resultado = await response.json();
        showMessageSuccess(`Manutenção atualizada com sucesso para o veículo ${modelo}`);
        return resultado;
      } else {
        throw new Error('Falha ao atualizar o histórico de manutenção');
      }
    } catch (error) {
      showMessageError(error.message || 'Erro ao atualizar manutenção');
    }
  }

  const isFormComplete = () => {
    return (
      placa && marca && modelo && ano && data_manutencao && detalhes && custo
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormComplete()) {
      if (isUpdating) {
        await atualizaHistoricoManutencao();  
      } else {
        await adicionarHistoricoManutencao(); 
      }
      handleClear();
      setIsUpdating(false); 
    } else {
      showMessageWarn('Por favor, preencha todos os campos do formulário.');
    }
  }

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
              <div className="d-flex justify-content-between">
                <Button onClick={() => setShowModal(true)}>
                  Consultar Manutenções
                </Button>
                <PesquisaManutencoesModal
                  show={showModal}
                  onHide={() => setShowModal(false)}
                  onManutencaoSelect={handleManutencaoSelect}
                />
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
