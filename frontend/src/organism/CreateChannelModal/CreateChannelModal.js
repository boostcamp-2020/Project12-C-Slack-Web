import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { workspace } from '../../store'
import Modal from '../../atom/Modal'
import Title from '../../atom/Title'
import Icon from '../../atom/Icon'
import Input from '../../atom/Input'
import Button from '../../atom/Button'
import { CLOSE, HASHTAG, LOCK } from '../../constant/icon'
import { debounce } from '../../util'
import Request from '../../util/request'
import { COLOR } from '../../constant/style'
import ModalInputSection from '../ModalInputSection'

const maxChannelName = 80
const maxChannelDescription = 250

const CreateChannelModal = ({ handleClose }) => {
  const workspaceId = useRecoilValue(workspace)
  const [isPrivate, setPrivateOption] = useState(false)
  const [channelName, setChannelName] = useState('')
  const [channelDescription, setChannelDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const checkDuplicateName = async title => {
    if (
      await Request.GET('/api/channel/check-duplicate-name', {
        title,
        workspaceId,
      })
    )
      setErrorMessage('That name is already taken by a channel, username')
    else setErrorMessage('')
  }
  const submitChannelInfo = async () => {
    const channelId = await Request.POST('/api/channle', {
      title: channelName,
      channelType: isPrivate ? 1 : 0,
    })
  }
  const handleDebounce = useRef(debounce(checkDuplicateName, 1000)).current
  const handleName = (setter, debounce) => e => {
    setter(e.target.value)
    if (debounce) debounce(e.target.value)
  }
  const handleDescription = async e => {
    // TODO emoji 추가할 수 있도록 변경해야 함.
    setChannelDescription(e.target.value)
  }
  return (
    <Modal handleClose={handleClose}>
      <StyledModalHeader>
        <Title isBold={true}>Create a {isPrivate && 'private'} channel</Title>
        <Button type="icon" handleClick={handleClose}>
          <Icon icon={CLOSE} color={COLOR.GRAY} />
        </Button>
      </StyledModalHeader>
      <StyledModalContent>
        <div>
          Channels are where your team communicates. They’re best when organized
          around a topic — #marketing, for example.
        </div>
        <ModalInputSection name="Name" errorMessage={errorMessage}>
          <Input
            placeholder="e.g. plan-budget"
            handleChange={handleName(setChannelName, handleDebounce)}
            value={channelName}
            maxLength={maxChannelName}
          >
            <Icon icon={isPrivate ? LOCK : HASHTAG} padding="5px" />
          </Input>
        </ModalInputSection>
        <ModalInputSection
          name="Description"
          errorMessage={errorMessage}
          optionalText="(optional)"
          description={'What’s this channel about?'}
        >
          <Input
            handleChange={handleDescription}
            value={channelDescription}
            maxLength={maxChannelDescription}
          />
        </ModalInputSection>
        <Button
          handleClick={submitChannelInfo}
          children="Create"
          disabled={errorMessage || !channelName}
        />
      </StyledModalContent>
    </Modal>
  )
}
const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`
const StyledModalContent = styled.div`
  padding: 15px;
`

export default CreateChannelModal
