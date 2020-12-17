import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constant/style'
function Input({
  children,
  placeholder,
  handleChange,
  handleKey,
  value,
  maxLength,
  type = 'default',
}) {
  return (
    <StyledInputWrapper tabIndex="-1" type={type}>
      {children}
      <StyledInput
        placeholder={placeholder}
        onChange={handleChange}
        onKeyPress={handleKey}
        value={value}
        tabIndex="0"
      />
      {maxLength && (
        <StyledMaxLength>{maxLength - value?.length}</StyledMaxLength>
      )}
    </StyledInputWrapper>
  )
}
const StyledInputWrapper = styled.div`
  ${({ type }) => {
    if (type === 'default')
      return `
      &:focus-within {
        box-shadow: 0 0 0 1px rgba(18, 100, 163, 1),
          0 0 0 5px rgba(29, 155, 209, 0.3);
        border-radius: 4px;
        border-color: transparent;
      }
      &:focus-within > div {
        display: block;
      }
      border: 1px solid ${COLOR.TRANSPARENT_GRAY};
      border-radius: 4px;
    `
  }}
  outline: none;
  justify-content: space-between;
  display: flex;
  padding: 5px;
`
const StyledMaxLength = styled.div`
  font-size: 18px;
  line-height: 1.33334;
  font-weight: 400;
  display: none;
  margin-left: 10px;
  color: ${COLOR.DARK_GRAY};
`
const StyledInput = styled.input`
  font-size: 18px;
  line-height: 1.33334;
  font-weight: 400;
  width: 100%;
  border: none;
  outline: none;
  background-color: inherit;
`

export default Input
