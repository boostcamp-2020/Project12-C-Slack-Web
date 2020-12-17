import React, { useState } from 'react'
import styled from 'styled-components'
import Description from '../../presenter/Description/Description'
import MainDescription from '../../presenter/MainDescription'
import Button from '../../presenter/Button'
import request from '../../util/request'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import Input from '../../presenter/Input'
import { COLOR } from '../../constant/style'

const MAX_CHANNEL_NAME = 80
const MAXIMUM_NAME_LENGH_ERROR =
  'channel names can’t be longer than 80 characters.'
const NULL_NAME_ERROR = 'channel names can’t be empty'

const CreateWorkspaceInitChannel = ({ workspaceName }) => {
  const history = useHistory()
  const [nameError, setNameError] = useState(NULL_NAME_ERROR)
  const [channelName, setChannelName] = useState('')
  const checkChannelName = channelName => {
    if (channelName.length > 0 && channelName.length <= MAX_CHANNEL_NAME) {
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
        history.push(
          `/workspace/${data.data.workspaceId}/${data.data.channelId}`,
        )
      }
    } catch (err) {
      toast.error('워크스페이스 생성에 실패하였습니다.', {
        onClose: () => history.go(0),
      })
    }
  }

  const handleName = e => {
    setChannelName(e.target.value)
    if (MAX_CHANNEL_NAME < e.target.value.length) {
      setNameError(MAXIMUM_NAME_LENGH_ERROR)
    } else if (e.target.value.length === 0) {
      setNameError(NULL_NAME_ERROR)
    } else if (e.target.value.length > 0) {
      setNameError('')
    }
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
      <Input
        handleChange={handleName}
        value={channelName}
        maxLength={MAX_CHANNEL_NAME}
      ></Input>
      <StyledErrorMessage>{nameError}</StyledErrorMessage>
      <StyledDiv>
        <Button
          handleClick={() => createWorkspace(channelName)}
          disabled={!!nameError}
        >
          생성
        </Button>
      </StyledDiv>
    </>
  )
}

const StyledDiv = styled.div`
  margin-top: 30px;
`

const StyledErrorMessage = styled.span`
  display: inline-block;
  font-weight: 700;
  color: ${COLOR.RED};
  word-break: break-all;
`

export default CreateWorkspaceInitChannel
