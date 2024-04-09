import { useEffect, useState } from 'react'

const useButtonState = (...fields) => {
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false)
  const [isClearButtonEnabled, setIsClearButtonEnabled] = useState(false)

  useEffect(() => {
    const isAnyFieldFilled = fields.some((field) => field.trim())
    setIsSaveButtonEnabled(isAnyFieldFilled)
    setIsClearButtonEnabled(isAnyFieldFilled)
  }, fields)

  return { isSaveButtonEnabled, isClearButtonEnabled }
}

export default useButtonState
