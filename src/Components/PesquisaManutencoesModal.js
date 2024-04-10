import React, { useState } from 'react'
import { Modal, Form, Button, Table } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { API_BASE_URL } from '../config'
import axios from 'axios'
import { FaTrash } from 'react-icons/fa'
import ConfirmacaoExclusaoModal from './ConfirmacaoExclusaoModal'
import { showMessageSuccess } from '../utils'

const PesquisaManutencoesModal = ({ show, onHide, veiculoId }) => {
  const [termoPesquisa, setTermoPesquisa] = useState('')
  const [manutencoes, setManutencoes] = useState([])
  const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false)
  const [idManutencaoParaExcluir, setIdManutencaoParaExcluir] = useState(null)

  const pesquisar = async () => {
    try {
      const endpoint = `/historicoManutencao/veiculo/${veiculoId}`

      const response = await fetch(`${API_BASE_URL}${endpoint}`)
      const data = await response.json()
      setManutencoes(data)
    } catch (error) {
      console.error('Erro ao buscar manutenções:', error)
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

  const confirmarExclusao = (event, id) => {
    event.stopPropagation()
    setIdManutencaoParaExcluir(id)
    setShowConfirmacaoModal(true)
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Pesquisa de Manutenções</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex">
          <Form.Control
            type="text"
            placeholder="Digite detalhes da manutenção"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && pesquisar()}
          />
          <Button variant="primary" onClick={pesquisar} className="ms-2">
            <FaSearch />
          </Button>
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
