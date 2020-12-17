import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import LoginButton from '../../presenter/LoginButton/LoginButton'
import { GITHUB } from '../../constant/icon'
import Icon from '../../presenter/Icon'
import styled from 'styled-components'
import SlackIcon from '../../presenter/SlackImage'
import { isEmpty } from '../../util'
import QueryString from 'qs'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_API_URL

const LoginPage = props => {
  const history = useHistory()
  const githubIcon = <Icon icon={GITHUB} size="1.6rem" />
  const query = QueryString.parse(props.location.search, {
    ignoreQueryPrefix: true,
  })
  useEffect(() => {
    if (!isEmpty(query.invitecode)) {
      localStorage.setItem('invitecode', query.invitecode)
    }
  }, [])

  const gohomeHandle = () => {
    history.push('/')
  }
  return (
    <>
      <LoginHeader>
        <SlackIcon onClick={gohomeHandle} />
      </LoginHeader>
      <CenterDiv>
        <MainDescription>Slack에 로그인</MainDescription>
        <Description>사용하려는 github 계정으로 계속해 주세요.</Description>
        <LoginDiv>
          <form method="GET" action={baseURL + '/api/user/sign-in/github'}>
            <LoginButton icon={githubIcon} label={'Login With github'} />
          </form>
        </LoginDiv>
      </CenterDiv>
    </>
  )
}

const LoginHeader = styled.header`
  display: flex;
  flex-direction: column;
  padding: 48px 0 40px;
  width: 100%;
  align-items: center;
`

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const MainDescription = styled.h1`
  color: #1d1c1d;
  font-weight: 700;
  font-size: 48px;
  line-height: 46px;
  text-align: center;
  margin-bottom: 10px;
`

const Description = styled.p`
  color: #454245;
  margin-bottom: 36px;
`

const LoginDiv = styled.div`
  margin: 70px 0px;
`

export default LoginPage
