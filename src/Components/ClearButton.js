import React from 'react';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa'; 

const ClearButton = ({ onClear, isClearing = false }) => {

  return (
    <Button 
      variant="primary" 
      onClick={onClear} 
      disabled={isClearing} 
      className='btn-lg mt-2 me-2'
    >
      <FaTrash />
    </Button>
  );
};

export default ClearButton;
