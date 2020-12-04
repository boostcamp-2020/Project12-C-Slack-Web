import React from 'react'
import styled from 'styled-components'
import Description from '../../atom/Description/Description'
import MainDescription from '../../atom/MainDescription'
import Button from '../../atom/Button/'

const CreateWorkspaceName = ({
  workspaceName,
  setWorkspaceName,
  setIsInputName,
}) => {
  const checkName = workspaceName => {
    if (workspaceName.length > 0 && workspaceName.length < 250) {
      return true
    }
    return false
  }
  const goInitChannel = workspaceName => {
    if (checkName(workspaceName)) {
      setIsInputName(true)
    }
  }
  const handleName = e => {
    setWorkspaceName(e.target.value)
  }
  return (
    <>
      <MainDescription fontSize="48px" lineHeight="54px">
        회사 또는 팀 이름이 어떻게 됩니까?
      </MainDescription>
      <Description>
        Slack 워크스페이스의 이름이 됩니다. 팀이 인식할 수 있는 이름을
        입력하세요.
      </Description>
      <StyledInput onChange={handleName}></StyledInput>
      <StyledDiv>
        <Button handleClick={() => goInitChannel(workspaceName)}>다음</Button>
      </StyledDiv>
    </>
  )
}

const StyledInput = styled.input`
  width: 100%;
  min-height: 30px;
`

const StyledDiv = styled.div`
  margin-top: 30px;
`

export default CreateWorkspaceName
