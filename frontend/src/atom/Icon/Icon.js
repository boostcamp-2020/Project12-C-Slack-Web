import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Icon = ({ icon, size, color, padding }) => {
  return (
    <StyledIcon size={size} padding={padding}>
      <FontAwesomeIcon icon={icon} color={color || 'black'} />
    </StyledIcon>
  )
}
const StyledIcon = styled.i`
  font-size: ${({ size }) => (size ? size : '1rem')};
  padding: ${({ padding }) => padding};
`
export default Icon
