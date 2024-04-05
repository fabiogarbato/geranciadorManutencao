import React, { useState, useEffect } from 'react';
import { Modal, Form, ListGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { API_BASE_URL } from '../config';
import '../CadastroVeiculo.css'

const PesquisaVeiculosModal = ({ show, onHide, onVeiculoSelecionado }) => {
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);

  const pesquisar = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/veiculos${termoPesquisa ? `?search=${termoPesquisa}` : ''}`);
      const data = await response.json();
      setVeiculos(data);
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
    }
  };
  
  const handleSelecionarVeiculo = (veiculo) => {
    setVeiculoSelecionado(veiculo);
    onVeiculoSelecionado(veiculo);
    onHide();
  };

  const handleClose = () => {
    setTermoPesquisa(''); 
    setVeiculos([]); 
    setVeiculoSelecionado(null); 
    onHide(); 
  };

  return (
    <Modal show={show} onHide={handleClose} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Pesquisa Rápida de Veículos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex">
          <Form.Control
            type="text"
            placeholder="Digite a placa, marca ou modelo do veículo"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && pesquisar()}
          />
          <Button variant="primary" onClick={pesquisar} className="ms-2">
            <FaSearch />
          </Button>
        </div>
        <ListGroup className="mt-3">
          {veiculos.map((veiculo) => (
            <ListGroup.Item
              key={veiculo.id}
              action
              onClick={() => handleSelecionarVeiculo(veiculo)}
              active={veiculoSelecionado?.id === veiculo.id}
            >
              {veiculo.placa} - {veiculo.marca} {veiculo.modelo}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>

  );
};

export default PesquisaVeiculosModal;
