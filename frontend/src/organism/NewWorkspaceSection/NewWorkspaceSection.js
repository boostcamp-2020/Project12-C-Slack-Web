import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../atom/Button'
import Description from '../../atom/Description/Description'
import MainDescription from '../../atom/MainDescription/MainDescription'

const NewWorkspaceSection = ({ handler }) => {
  const history = useHistory()
  return (
    <>
      <StyledSection>
        <MainDescription marginLeft="0px">새 워크스페이스 생성</MainDescription>
        <Description marginLeft="0px">
          다른 팀을 위해 새로운 워크스페이스를 생성하려고 하나요?
        </Description>
        <Button
          type="transparent"
          handleClick={() => {
            history.push('/create-workspace')
          }}
        >
          새 워크 스페이스 생성
        </Button>
      </StyledSection>
    </>
  )
}

const StyledSection = styled.section`
  text-align: left;
`

export default NewWorkspaceSection
