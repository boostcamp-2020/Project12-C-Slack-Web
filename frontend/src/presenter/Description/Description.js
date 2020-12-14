import styled from 'styled-components'

const Description = ({ children, fontSize, marginBottom, marginLeft }) => {
  return (
    <>
      <StyledP
        fontSize={fontSize}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
      >
        {children}
      </StyledP>
    </>
  )
}

const StyledP = styled.p`
  font-size: ${({ fontSize }) => {
    return fontSize ? fontSize : '14px'
  }};
  color: #454245;
  margin-bottom: ${({ marginBottom }) => {
    return marginBottom ? marginBottom : '28px'
  }};
  margin-left: ${({ marginLeft }) => {
    return marginLeft ? marginLeft : '0px'
  }};
`

export default Description
