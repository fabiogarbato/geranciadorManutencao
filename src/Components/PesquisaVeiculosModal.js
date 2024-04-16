import React, { useState } from 'react'
import { Modal, Form, Button, Table } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { API_BASE_URL } from '../config'
import '../View/CadastroVeiculo.css'
import axios from 'axios'
import { FaTrash } from 'react-icons/fa'
import ConfirmacaoExclusaoModal from './ConfirmacaoExclusaoModal'
import { showMessageSuccess, showMessageError, showMessageWarn } from '../utils'
import useSortableData from './useSortableData';

const PesquisaVeiculosModal = ({ show, onHide, onVeiculoSelecionado }) => {
  const [termoPesquisa, setTermoPesquisa] = useState('')
  const [veiculos, setVeiculos] = useState([])
  const [, setVeiculoSelecionado] = useState(null)
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

  const { items: veiculosOrdenados, requestSort, renderSortIcon } = useSortableData(veiculos);

  const verificarDependenciasVeiculo = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/veiculos/${id}/check-dependencies`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showMessageWarn(error.response.data.message);
      } else {
        showMessageError('Erro ao verificar dependências do veículo.');
      }
      return null;
    }
  };

  const handleExcluirVeiculo = async (id) => {
    const dependencias = await verificarDependenciasVeiculo(id);
    if (dependencias) {
      if (dependencias && dependencias.message === 'Veículo pode ser excluído.') {
        try {
          const response = await axios.delete(`${API_BASE_URL}/veiculos/${id}`);
          if (response.status === 200) {
            const veiculosAtualizados = veiculos.filter(veiculo => veiculo.id !== id);
            setVeiculos(veiculosAtualizados);
            showMessageSuccess('Veículo excluído com sucesso.');
          }
        } catch (error) {
          showMessageError('Erro ao excluir veículo.');
        }
      } else {
        showMessageWarn(dependencias.message);
      }
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
              <th style={{ cursor: 'pointer' }} onClick={() => requestSort('placa')}>
                Placa{renderSortIcon('placa')}
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => requestSort('marca')}>
                Marca{renderSortIcon('marca')}
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => requestSort('modelo')}>
                Modelo{renderSortIcon('modelo')}
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => requestSort('ano')}>
                Ano{renderSortIcon('ano')}
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => requestSort('cor')}>
                Cor{renderSortIcon('cor')}
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => requestSort('km_atual')}>
                Km Atual{renderSortIcon('km_atual')}
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => requestSort('tipo')}>
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
                    <Button variant="danger" onClick={(e) => {
                      e.stopPropagation();
                      confirmarExclusao(e, veiculo.id);
                    }}>
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
