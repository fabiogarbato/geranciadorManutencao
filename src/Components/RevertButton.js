import React from 'react';
import { Button } from 'react-bootstrap';
import { FaUndo } from 'react-icons/fa'; 

const RevertButton = ({ onRevert, isReverting = false }) => {
  return (
    <Button
      variant="danger" 
      onClick={onRevert}
      disabled={isReverting}
      className='btn-lg mt-2' 
    >
      <FaUndo /> 
    </Button>
  );
};

export default RevertButton;
