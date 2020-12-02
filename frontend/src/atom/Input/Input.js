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
}) {
  return (
    <StyledInputWrapper tabIndex="0">
      {children}
      <StyledInput
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKey}
        value={value}
      />
      {maxLength && (
        <StyledMaxLength>{maxLength - value.length}</StyledMaxLength>
      )}
    </StyledInputWrapper>
  )
}
const StyledInputWrapper = styled.div`
  &:focus-within {
    outline: none;
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
`

export default Input
