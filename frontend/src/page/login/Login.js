import React from 'react'
import LoginButton from '../../atom/LoginButton/LoginButton'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_API_URL

const LoginPage = () => {
  const githubIcon = <FontAwesomeIcon icon={faGithub} size="2x" />

  return (
    <>
      <h1>Slack에 로그인</h1>
      <form method="GET" action={baseURL + '/api/user/sign-in/github'}>
        <LoginButton icon={githubIcon} label={'Login With github'} />
      </form>
    </>
  )
}

export default LoginPage
