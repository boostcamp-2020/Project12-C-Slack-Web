import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Modal from '../../atom/Modal'
import Title from '../../atom/Title'
import Icon from '../../atom/Icon'
import Input from '../../atom/Input'
import Button from '../../atom/Button'
import { CLOSE, HASHTAG, LOCK } from '../../constant/icon'
import { debounce } from '../../util'
import Request from '../../util/request'
import { COLOR } from '../../constant/style'

const maxChannelName = 80
const CreateChannelModal = ({ handleClose }) => {
  const [isPrivate, setPrivateOption] = useState(false)
  const [channelName, setChannelName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const checkDuplicateName = async () => {
    if (await Request.GET('/api/channel/check-duplicate-name', channelName))
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
  const handleChange = (setter, debounce) => e => {
    setter(e.target.value)
    if (debounce) debounce()
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
        <strong>Name</strong>
        {errorMessage}
        <div>
          <Input
            placeholder="e.g. plan-budget"
            handleChange={handleChange(setChannelName, handleDebounce)}
            value={channelName}
            maxLength={maxChannelName}
          >
            <Icon icon={isPrivate ? LOCK : HASHTAG} padding="5px" />
          </Input>
        </div>
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
