import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constant/style'
const Button = ({
  handleClick,
  children,
  type = 'default',
  disabled = false,
  size = 'default',
  onClick,
}) => {
  return (
    <StyledButton
      onClick={handleClick || onClick}
      type={type}
      disabled={disabled}
      size={size}
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  font-size: ${({ size }) => (size === 'small' ? '8px' : '15px')};
  font-weight: 900;
  height: ${({ size }) => (size === 'small' ? '' : '36px')};
  padding: ${({ size }) => (size === 'small' ? '' : '0 12px 1px')};
  border-style: none;
  border-radius: 4px;
  outline: none;
  color: ${({ type, disabled }) => {
    if (disabled) return COLOR.GRAY
    if (type === 'transparent') return COLOR.GRAY
    if (type === 'leave') return COLOR.WHITE
    return COLOR.WHITE
  }};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ type, disabled }) => {
    if (disabled) return COLOR.LIGHT_GRAY
    if (type === 'transparent') return 'transparent'
    if (type === 'icon') return 'transparent'
    if (type === 'leave') return '#D91D57'
    return COLOR.GREEN
  }};
  border: ${({ type }) => {
    if (type === 'transparent') return `1px solid ${COLOR.TRANSPARENT_GRAY}`
    if (type === 'icon') return 'transparent'
  }};
  &:hover {
    ${({ type, disabled }) => {
      if (disabled) return
      if (type === 'transparent')
        return `background: ${COLOR.HOVER_GRAY}; box-shadow: 0 1px 4px rgba(0,0,0,0.3);`
      if (type === 'default')
        return `background: ${COLOR.HOVER_GREEN}; box-shadow: 0 1px 4px rgba(0,0,0,0.3);`
      if (type === 'icon')
        return `background: ${COLOR.HOVER_GRAY}; 
                box-shadow:0 1px 3px 0 rgba(0,0,0, 0.08);`
    }}
  }
  ${({ type }) => {
    if (type === 'icon')
      return `
        &:hover i svg {
          color: ${COLOR.ICON_HOVER};
        }
      `
  }}
`
export default Button
