import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmacaoExclusaoModal = ({ show, onClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir?</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Cancelar
            </Button>
            <Button variant="danger" onClick={onConfirm}>
                Excluir
            </Button>
        </Modal.Footer>
    </Modal>
  );
};

export default ConfirmacaoExclusaoModal;
