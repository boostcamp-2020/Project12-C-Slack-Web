import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Icon = ({ icon, size }) => {
  return (
    <StyledIcon size={size}>
      <FontAwesomeIcon icon={icon} />
    </StyledIcon>
  )
}
const StyledIcon = styled.i`
  font-size: ${({ size }) => (size ? size : '1rem')};
`
export default Icon
