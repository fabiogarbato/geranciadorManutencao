import React, { useState, useEffect } from 'react'
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
import useSortableData from './useSortableData';

const PesquisaManutencoesModal = ({ show, onHide, onManutencaoSelect }) => {

  const [, setTermoPesquisa] = useState('')
  const [manutencoes, setManutencoes] = useState([])
  const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false)
  const [idManutencaoParaExcluir, setIdManutencaoParaExcluir] = useState(null)
  const [placa, setPlaca] = useState('')
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [ano, setAno] = useState('')
  const [, setData_manutencao] = useState('')
  const [, setDetalhes] = useState('')
  const [, setCusto] = useState('')
  const {isClearButtonEnabled } = useButtonState(placa)
  const [isPlacaDisabled, setIsPlacaDisabled] = useState(false)
  const [veiculo, setVeiculo] = useState(null);


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

    if (placa.trim().length !== 8) { 
      showMessageWarn('Digite a placa completa!');
      return;
    }

    try {
      const endpoint = `/veiculos/search?search=${encodeURIComponent(placa)}`
      const response = await fetch(`${API_BASE_URL}${endpoint}`)
      const data = await response.json()

      if (data.length > 0) {
        const veiculoCarregado = data[0];
        setVeiculo(veiculoCarregado);
        setMarca(veiculoCarregado.marca);
        setModelo(veiculoCarregado.modelo);
        setAno(veiculoCarregado.ano);
        setIsPlacaDisabled(true);
  
        const manutencoesResponse = await fetch(
          `${API_BASE_URL}/historicoManutencao/veiculo/${veiculoCarregado.id}`,
        )
        const manutencoesData = await manutencoesResponse.json()
        setManutencoes(manutencoesData)
      } else {
        showMessageWarn('Placa não cadastrada!');
        setManutencoes([]);
      }
    } catch (error) {
      console.error('Erro ao buscar veículo:', error);
    }
  };
  

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
    setIsPlacaDisabled(false)
    setPlaca('')
    setMarca('')
    setModelo('')
    setAno('')
    setData_manutencao('')
    setDetalhes('')
    setCusto('')
    setManutencoes([])
  }

  useEffect(() => {
    if (show) {
      handleClear();
    }
  }, [show]);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (!placa.trim()) {
      showMessageWarn('Preencha o campo placa!');
      return;
    }
    pesquisarPlaca();  
  };  

  const { items: sortedManutencoes, requestSort, sortConfig, renderSortIcon } = useSortableData(manutencoes);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return '';
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

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
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();  
                        handleSubmit(e);  
                      }
                    }}                    
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
              <th style={{ cursor: 'pointer' }} onClick={() => requestSort('data_manutencao')}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  Data da Manutenção {renderSortIcon('data_manutencao')}
                </div>
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => requestSort('detalhes')}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  Detalhes {renderSortIcon('detalhes')}
                </div>
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => requestSort('custo')}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  Custo (R$) {renderSortIcon('custo')}
                </div>
              </th>
              <th>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  Ações
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedManutencoes.map((manutencao) => (
              <tr 
                key={manutencao.id} 
                onClick={() => veiculo ? onManutencaoSelect(manutencao, veiculo) : console.error("Veículo não está disponível")}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {new Date(manutencao.data_manutencao).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {manutencao.detalhes}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {manutencao.custo}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmarExclusao(e, manutencao.id);
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </div>
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
