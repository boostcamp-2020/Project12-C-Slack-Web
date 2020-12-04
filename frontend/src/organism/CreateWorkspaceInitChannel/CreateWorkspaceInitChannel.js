import React, { useState } from 'react'
import styled from 'styled-components'
import Description from '../../atom/Description/Description'
import MainDescription from '../../atom/MainDescription'
import Button from '../../atom/Button'
import request from '../../util/request'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'

const CreateWorkspaceInitChannel = ({ workspaceName }) => {
  const history = useHistory()
  const [channelName, setChannelName] = useState('')
  const checkChannelName = channelName => {
    if (channelName.length > 0 && channelName.length < 80) {
      return true
    }
    return false
  }
  const createWorkspace = async channelName => {
    try {
      if (checkChannelName(channelName)) {
        const { data } = await request.POST('/api/workspace', {
          name: workspaceName,
          channelName: channelName,
        })
        history.push(`/workspace/${data.data.workspaceId}`)
      }
    } catch (err) {
      toast.error('워크스페이스 생성에 실패하였습니다.', {
        onClose: () => history.go(0),
      })
    }
  }
  const handleName = e => {
    setChannelName(e.target.value)
  }
  return (
    <>
      <MainDescription fontSize="48px" lineHeight="54px">
        현재 고객님의 팀은 어떤 일을 진행하고 계시나요?
      </MainDescription>
      <Description>
        프로젝트, 캠페인, 이벤트 또는 성사하려는 거래 등 무엇이든 될 수
        있습니다.
      </Description>
      <StyledInput onChange={handleName}></StyledInput>
      <StyledDiv>
        <Button handleClick={() => createWorkspace(channelName)}>생성</Button>
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

export default CreateWorkspaceInitChannel
