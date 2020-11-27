import React from 'react'
import styled from 'styled-components'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_API_URL

const LoginPage = () => {
  return (
    <>
      <h1>Slack에 로그인</h1>
      <form method="GET" action={baseURL + '/api/user/sign-in/github'}>
        <LoginButton type="submit">Login With github</LoginButton>
      </form>
    </>
  )
}

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #1da1f2;
  outline: none;
  background-color: white;
  width: 12rem;
  height: 2rem;
  border-radius: 20px;
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

export default LoginPage
