import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
function Modal({ children, handleClose }) {
  return createPortal(
    <StyledModalOverlay onClick={handleClose}>
      <StyledModalContent role="dialog">{children}</StyledModalContent>
    </StyledModalOverlay>,
    document.getElementById('portal'),
  )
}
const StyledModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  align-items: center;
  display: flex;
  top: 0;
  justify-content: center;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
`
const StyledModalContent = styled.div`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 0 0 1px rgba(29, 28, 29, 0.13),
    0 18px 48px 0 rgba(0, 0, 0, 0.35);
`
export default Modal
