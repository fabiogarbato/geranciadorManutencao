import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Table,
} from 'react-bootstrap'
import { API_BASE_URL } from '../config'
import axios from 'axios'
import {
  FaTrash,
  FaTag,
  FaTrademark,
  FaCarAlt,
  FaCalendarAlt,
} from 'react-icons/fa'
import ConfirmacaoExclusaoModal from './ConfirmacaoExclusaoModal'
import { showMessageSuccess } from '../utils'
import ClearButton from './ClearButton'
import { showMessageWarn } from '../utils'
import useButtonState from './useButtonState'

const PesquisaManutencoesModal = ({ show, onHide, veiculoId }) => {
  const [termoPesquisa, setTermoPesquisa] = useState('')
  const [manutencoes, setManutencoes] = useState([])
  const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false)
  const [idManutencaoParaExcluir, setIdManutencaoParaExcluir] = useState(null)
  const [placa, setPlaca] = useState('')
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [ano, setAno] = useState('')
  const [data_manutencao, setData_manutencao] = useState('')
  const [detalhes, setDetalhes] = useState('')
  const [custo, setCusto] = useState('')

  const { isSaveButtonEnabled, isClearButtonEnabled } = useButtonState(placa)

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
    if (!placa.trim()) {
      showMessageWarn('Preencha o campo placa!')
      return
    }

    try {
      const endpoint = `/veiculos/search?search=${encodeURIComponent(placa)}`
      const response = await fetch(`${API_BASE_URL}${endpoint}`)
      const data = await response.json()

      if (data.length > 0) {
        const veiculo = data[0]
        setMarca(veiculo.marca)
        setModelo(veiculo.modelo)
        setAno(veiculo.ano)

        const manutencoesResponse = await fetch(
          `${API_BASE_URL}/historicoManutencao/veiculo/${veiculo.id}`,
        )
        const manutencoesData = await manutencoesResponse.json()
        setManutencoes(manutencoesData)
      } else {
        showMessageWarn('Placa não cadastrada!')
      }
    } catch (error) {
      console.error('Erro ao buscar veículo:', error)
    }
  }

  const handleClose = () => {
    setTermoPesquisa('')
    setManutencoes([])
    onHide()
  }

  const handleExcluirManutencao = async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/historicoManutencao/${id}`,
      )

      if (response.status === 200) {
        const manutencoesAtualizadas = manutencoes.filter(
          (manutencao) => manutencao.id !== id,
        )
        setManutencoes(manutencoesAtualizadas)

        showMessageSuccess('Manutenção excluída com sucesso.')
      }
    } catch (error) {
      console.error('Erro ao excluir manutenção:', error)
      alert('Erro ao excluir manutenção.')
    }
  }

  const handleChange = (event) => {
    const { id, value } = event.target
    const formattedValue = toUpperCaseAndLimit(value)

    switch (id) {
      case 'formPlaca':
        setPlaca(formatarPlaca(value))
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
      default:
        break
    }
  }

  const confirmarExclusao = (event, id) => {
    event.stopPropagation()
    setIdManutencaoParaExcluir(id)
    setShowConfirmacaoModal(true)
  }

  const handleClear = () => {
    setPlaca('')
    setMarca('')
    setModelo('')
    setAno('')
    setData_manutencao('')
    setDetalhes('')
    setCusto('')
    setManutencoes([])
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Pesquisa de Manutenções</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex">
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
                    disabled={true}
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
                    disabled={true}
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
                    placeholder="Ano"
                    disabled={true}
                    value={ano}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Data da Manutenção</th>
              <th>Detalhes</th>
              <th>Custo (R$)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {manutencoes.map((manutencao) => (
              <tr key={manutencao.id}>
                <td>
                  {new Date(manutencao.data_manutencao).toLocaleDateString()}
                </td>
                <td>{manutencao.detalhes}</td>
                <td>{manutencao.custo}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={(e) => confirmarExclusao(e, manutencao.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Container>
          <ClearButton
            onClear={handleClear}
            isDisabled={!isClearButtonEnabled}
          />
        </Container>
        <ConfirmacaoExclusaoModal
          show={showConfirmacaoModal}
          onClose={() => setShowConfirmacaoModal(false)}
          onConfirm={() => {
            handleExcluirManutencao(idManutencaoParaExcluir)
            setShowConfirmacaoModal(false)
          }}
        />
      </Modal.Body>
    </Modal>
  )
}

export default PesquisaManutencoesModal
