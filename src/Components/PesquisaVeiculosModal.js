import React, { useState } from 'react'
import { Modal, Form, Button, Table } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { API_BASE_URL } from '../config'
import '../Telas/CadastroVeiculo.css'
import axios from 'axios'
import { FaTrash } from 'react-icons/fa'
import ConfirmacaoExclusaoModal from './ConfirmacaoExclusaoModal'
import { showMessageSuccess } from '../utils'

const PesquisaVeiculosModal = ({ show, onHide, onVeiculoSelecionado }) => {
  const [termoPesquisa, setTermoPesquisa] = useState('')
  const [veiculos, setVeiculos] = useState([])
  const [VeiculoSelecionado, setVeiculoSelecionado] = useState(null)
  const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false);
  const [idVeiculoParaExcluir, setIdVeiculoParaExcluir] = useState(null);

  const handleSelecionarVeiculo = (veiculo) => {
    onVeiculoSelecionado(veiculo)
    onHide()
  }

  const pesquisar = async () => {
    try {
      const termoPesquisaTrimmed = termoPesquisa.trim()
      const endpoint = termoPesquisaTrimmed
        ? `/veiculos/search?search=${encodeURIComponent(termoPesquisaTrimmed)}`
        : '/veiculos'

      const response = await fetch(`${API_BASE_URL}${endpoint}`)
      const data = await response.json()
      setVeiculos(data)
    } catch (error) {
      console.error('Erro ao buscar veículos:', error)
    }
  }

  const handleClose = () => {
    setTermoPesquisa('')
    setVeiculos([])
    setVeiculoSelecionado(null)
    onHide()
  }

  const capitalizeFirstLetter = (string) => {
    if (!string) return ''
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  const [ordenacao, setOrdenacao] = useState({
    coluna: 'placa',
    direcao: 'asc',
  })

  const ordenarVeiculos = (coluna) => {
    const direcao =
      ordenacao.coluna === coluna && ordenacao.direcao === 'asc'
        ? 'desc'
        : 'asc'
    setOrdenacao({ coluna, direcao })
  }

  const renderSortIcon = (coluna) => {
    if (ordenacao.coluna === coluna) {
      return ordenacao.direcao === 'asc' ? ' ↑' : ' ↓'
    }
    return ' ↕'
  }

  const veiculosOrdenados = [...veiculos].sort((a, b) => {
    if (a[ordenacao.coluna] < b[ordenacao.coluna])
      return ordenacao.direcao === 'asc' ? -1 : 1
    if (a[ordenacao.coluna] > b[ordenacao.coluna])
      return ordenacao.direcao === 'asc' ? 1 : -1
    return 0
  })

  const handleExcluirVeiculo = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/veiculos/${id}`);
  
      if (response.status === 200) {
        const veiculosAtualizados = veiculos.filter(veiculo => veiculo.id !== id);
        setVeiculos(veiculosAtualizados);
  
        showMessageSuccess('Veículo excluído com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao excluir veículo:', error);
      alert('Erro ao excluir veículo.');
    }
  };
  
  const confirmarExclusao = (event, id) => {
    event.stopPropagation();
    setIdVeiculoParaExcluir(id);
    setShowConfirmacaoModal(true);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Pesquisa Rápida de Veículos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex">
          <Form.Control
            type="text"
            placeholder="Digite a placa, marca ou modelo do veículo"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value.toUpperCase())} // Converte para maiúsculas
            onKeyPress={(e) => e.key === 'Enter' && pesquisar()}
          />
          <Button variant="primary" onClick={pesquisar} className="ms-2">
            <FaSearch />
          </Button>
        </div>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th onClick={() => ordenarVeiculos('placa')}>
                Placa{renderSortIcon('placa')}
              </th>
              <th onClick={() => ordenarVeiculos('marca')}>
                Marca{renderSortIcon('marca')}
              </th>
              <th onClick={() => ordenarVeiculos('modelo')}>
                Modelo{renderSortIcon('modelo')}
              </th>
              <th onClick={() => ordenarVeiculos('ano')}>
                Ano{renderSortIcon('ano')}
              </th>
              <th onClick={() => ordenarVeiculos('cor')}>
                Cor{renderSortIcon('cor')}
              </th>
              <th onClick={() => ordenarVeiculos('km_atual')}>
                Km Atual{renderSortIcon('km_atual')}
              </th>
              <th onClick={() => ordenarVeiculos('tipo')}>
                Tipo{renderSortIcon('tipo')}
              </th>
              <th>Ações</th> 
            </tr>
          </thead>
          <tbody>
            {veiculosOrdenados.map((veiculo) => (
              <tr
                key={veiculo.id}
                onClick={() => handleSelecionarVeiculo(veiculo)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {veiculo.placa}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {veiculo.marca}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {veiculo.modelo}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>                
                    {veiculo.ano}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {veiculo.cor}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {veiculo.km_atual}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {capitalizeFirstLetter(veiculo.tipo)}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="danger" onClick={(e) => confirmarExclusao(e, veiculo.id)}>
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ConfirmacaoExclusaoModal
          show={showConfirmacaoModal}
          onClose={() => setShowConfirmacaoModal(false)}
          onConfirm={() => {
            handleExcluirVeiculo(idVeiculoParaExcluir);
            setShowConfirmacaoModal(false);
          }}
        />
      </Modal.Body>
    </Modal>
  )
}

export default PesquisaVeiculosModal
