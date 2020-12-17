import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constant/style'
const ModalInputSection = ({
  name,
  optionalText,
  errorMessage,
  children,
  description,
}) => {
  return (
    <StyledWrapper>
      <StyledInputName>
        <StyledStrong>{name}</StyledStrong>
        <StyledOptionalText>{optionalText}</StyledOptionalText>
        <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
      </StyledInputName>
      {children}
      <StyledDescription>{description}</StyledDescription>
    </StyledWrapper>
  )
}
const StyledErrorMessage = styled.span`
  display: inline-block;
  font-weight: 700;
  color: #e8912d;
  word-break: break-all;
`
const StyledOptionalText = styled.span`
  display: inline-block;
  font-size: 15px;
  color: ${COLOR.GRAY};
`
const StyledDescription = styled.div`
  margin: 5px 0;
  font-size: 13px;
  font-weight: 400;
  color: ${COLOR.GRAY};
`
const StyledStrong = styled.strong`
  margin-right: 10px;
`
const StyledWrapper = styled.div`
  margin: 20px 0;
`
const StyledInputName = styled.div`
  margin: 10px 0;
`

export default ModalInputSection
