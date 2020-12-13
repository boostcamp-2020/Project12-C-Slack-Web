import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../../constant/style'

const SmallButton = ({
  handleClick,
  children,
  type = 'default',
  disabled = false,
}) => {
  return (
    <StyledButton onClick={handleClick} type={type} disabled={disabled}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  font-size: 8px;
  font-weight: 900;
  border-style: none;
  border-radius: 4px;
  outline: none;
  color: ${({ type, disabled }) => {
    if (disabled) return COLOR.GRAY
    if (type === 'transparent') return COLOR.GRAY
    return COLOR.WHITE
  }};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ type, disabled }) => {
    if (disabled) return COLOR.LIGHT_GRAY
    if (type === 'transparent') return 'transparent'
    if (type === 'icon') return 'transparent'
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
export default SmallButton