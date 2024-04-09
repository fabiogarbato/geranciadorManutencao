import React, { useState } from 'react'
import ConfirmationModal from './ConfirmationModal'
import { Button } from 'react-bootstrap'

const BackButton = ({ backPath, shouldConfirm }) => {
  const [showModal, setShowModal] = useState(false)

  const handleBack = () => {
    if (shouldConfirm) {
      setShowModal(true)
    } else {
      window.location.href = backPath
    }
  }

  return (
    <>
      <Button variant="secondary" onClick={handleBack}>
        Voltar
      </Button>
      <ConfirmationModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}

export default BackButton
