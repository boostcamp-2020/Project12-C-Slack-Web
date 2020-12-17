import React from 'react'
import styled from 'styled-components'
const Title = ({ children, isBold }) => {
  return <StyleH1 isBold={isBold}>{children}</StyleH1>
}
const StyleH1 = styled.h1`
  margin: 0;
  line-height: 1.2143;
  font-size: 28px;
  font-weight: ${({ isBold }) => (isBold ? 900 : 400)};
`
export default Title
