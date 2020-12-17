import React from 'react'
import styled from 'styled-components'

function SubmitButton({ icon, label }) {
  return (
    <LoginButton type="submit">
      {icon}
      {label}
    </LoginButton>
  )
}

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #1da1f2;
  outline: none;
  background-color: white;
  width: ${props => props.width || '20rem'};
  height: ${props => props.width || '2.5rem'};
  border-radius: 4px;
  & > * {
    padding-right: 10px;
  }
  :hover {
    background-color: #fcf7f7;
    cursor: pointer;
  }
  :active {
    background-color: #ebebeb;
  }
`

export default SubmitButton
