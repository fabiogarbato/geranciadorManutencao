import React from 'react';
import { Button } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa'; 

const SaveButton = ({ onSave, isSaving = false }) => {

  return (
    <Button 
      variant="success" 
      onClick={onSave} 
      disabled={isSaving} 
      className='btn-lg mt-2 me-2'
    >
      <FaSave />
    </Button>
  );
};

export default SaveButton;

