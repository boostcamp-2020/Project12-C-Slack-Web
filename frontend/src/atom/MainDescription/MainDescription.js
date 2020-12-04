import styled from 'styled-components'

const MainDescription = ({
  children,
  fontSize,
  marginBottom,
  fontWeight,
  lineHeight,
  textAlign,
  marginLeft,
}) => {
  return (
    <>
      <StyledP
        fontSize={fontSize}
        marginBottom={marginBottom}
        fontWeight={fontWeight}
        lineHeight={lineHeight}
        textAlign={textAlign}
        marginLeft={marginLeft}
      >
        {children}
      </StyledP>
    </>
  )
}

const StyledP = styled.p`
  color: #1d1c1d;
  font-weight: ${({ fontWeight }) => {
    return fontWeight ? fontWeight : 700
  }};
  font-size: ${({ fontSize }) => {
    return fontSize ? fontSize : '36px'
  }};
  line-height: ${({ lineHeight }) => {
    return lineHeight ? lineHeight : '36px'
  }};
  text-align: ${({ textAlign }) => {
    return textAlign ? textAlign : 'left'
  }};
  margin-bottom: ${({ marginBottom }) => {
    return marginBottom ? marginBottom : '10px'
  }};
  margin-left: ${({ marginLeft }) => {
    return marginLeft ? marginLeft : '0px'
  }};
`

export default MainDescription
