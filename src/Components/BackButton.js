import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BackButton = ({ backPath }) => {
  let navigate = useNavigate();

  return (
    <Button variant="secondary" onClick={() => navigate(backPath)}>
        Voltar
    </Button>
  );
};

export default BackButton;
