import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html{
    height: 100%;
  }
  body {
    padding: 0px;
    margin: 0px;
    height: 100%;
    width: 100%;
    scrollbar-width: thin;
    scrollbar-color: gray transparent;
  }
  #root{
    height:100%;
  }
  ::-webkit-scrollbar{
    width: 6px;
  }
  ::-webkit-scrollbar-track-piece{
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 3px;
    background-color: gray;
  }
  ::-webkit-scrollbar-button{
    width:0;
    height:0;
  }
`

export default GlobalStyle
