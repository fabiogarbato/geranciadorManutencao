import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Atenção</Modal.Title>
      </Modal.Header>
      <Modal.Body>Existem alterações para serem confirmadas ou revertidas.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
