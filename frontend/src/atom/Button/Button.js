import React from 'react'
import styled from 'styled-components'
const Button = ({ handleClick, children, type, disabled = false }) => {
  return (
    <StyledButton onClick={handleClick} type={type} disabled={disabled}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  font-size: 15px;
  height: 36px;
  min-width: 80px;
  padding: 0 12px 1px;
  border-style: none;
  border-radius: 4px;
  outline: none;
  color: ${({ type, disabled }) => {
    if (disabled) return '#4d4c4d'
    if (type === 'transparent') return '#4d4c4d'
    return '#fff'
  }};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ type, disabled }) => {
    if (disabled) return '#dddddd'
    if (type === 'transparent') return 'transparent'
    return '#007a5a'
  }};
  border: ${({ type }) => {
    if (type === 'transparent') return '1px solid rgba(29, 28, 29, 0.3)'
  }};
  font-size: 15px;
  font-weight: 900;
`
export default Button
