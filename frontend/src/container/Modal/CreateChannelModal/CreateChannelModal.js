import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { useHistory, useParams } from 'react-router-dom'

import { workspaceRecoil } from '../../../store'
import Modal from '../../../presenter/Modal'
import Title from '../../../presenter/Title'
import Icon from '../../../presenter/Icon'
import Input from '../../../presenter/Input'
import Button from '../../../presenter/Button'
import { CLOSE, HASHTAG, LOCK } from '../../../constant/icon'
import { debounce } from '../../../util'
import { COLOR } from '../../../constant/style'
import ModalInputSection from '../../../presenter/ModalInputSection'
import { checkDuplicateChannelName, createChannel } from '../../../api/channel'
import ToggleButton from '../../../presenter/Button/ToggleButton'
import useChannelList from '../../../hooks/useChannelList'

const MAX_CHANNEL_NAME = 80
const MAX_CHANNEL_DESCRIPTION = 250
const TIME_TO_WAIT_DEBOUNCE = 700
const MAXIMUM_NAME_LENGH_ERROR =
  'Channel names can’t be longer than 80 characters.'
const MAXIMUM_DESCRIPTION_LENGH_ERROR =
  'This field can’t be more than 250 characters.'
const DUPLICATED_NAME_ERROR =
  'That name is already taken by a channel, username'

const CreateChannelModal = ({ handleClose }) => {
  const history = useHistory()
  const { workspaceId } = useParams()
  const { _id: workspaceUserInfoId } = useRecoilValue(workspaceRecoil)
  const [, updateChannelList] = useChannelList()
  const [isPrivate, setPrivateOption] = useState(false)
  const [channelName, setChannelName] = useState('')
  const [channelDescription, setChannelDescription] = useState('')
  const [nameError, setNameError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const checkDuplicateName = async title => {
    if (
      title &&
      !(await checkDuplicateChannelName({
        title,
        workspaceId,
      }))
    )
      setNameError(DUPLICATED_NAME_ERROR)
  }

  const submitChannelInfo = async () => {
    const channelId = await createChannel({
      title: channelName,
      creator: workspaceUserInfoId,
      channelType: isPrivate ? 0 : 1,
      description: channelDescription,
      workspaceId,
    })
    updateChannelList()
    history.push(`/workspace/${workspaceId}/${channelId}`)
    handleClose()
  }

  const handleDebounce = useRef(
    debounce(checkDuplicateName, TIME_TO_WAIT_DEBOUNCE),
  ).current

  const handleName = e => {
    setChannelName(e.target.value)
    if (e.target.value.length === 0) return setNameError('')
    if (MAX_CHANNEL_NAME - e.target.value.length < 0)
      return setNameError(MAXIMUM_NAME_LENGH_ERROR)
    setNameError('')
    handleDebounce(e.target.value)
  }

  const handleDescription = async e => {
    // TODO emoji 추가할 수 있도록 변경해야 함.
    setChannelDescription(e.target.value)
    if (MAX_CHANNEL_DESCRIPTION - channelDescription.length < 0)
      setDescriptionError(MAXIMUM_DESCRIPTION_LENGH_ERROR)
    else setDescriptionError('')
  }
  const handlePrivateOption = () => {
    setPrivateOption(!isPrivate)
  }
  return (
    <Modal handleClose={handleClose}>
      <ModalForm>
        <StyledModalHeader>
          <Title isBold={true}>Create a {isPrivate && 'private'} channel</Title>
          <Button type="icon" handleClick={handleClose}>
            <Icon icon={CLOSE} color={COLOR.GRAY} />
          </Button>
        </StyledModalHeader>
        <StyledModalContent>
          <div>
            Channels are where your team communicates. They’re best when
            organized around a topic — #marketing, for example.
          </div>
          <ModalInputSection name="Name" errorMessage={nameError}>
            <Input
              placeholder="e.g. plan-budget"
              handleChange={handleName}
              value={channelName}
              maxLength={MAX_CHANNEL_NAME}
            >
              <Icon icon={isPrivate ? LOCK : HASHTAG} padding="5px" />
            </Input>
          </ModalInputSection>
          <ModalInputSection
            name="Description"
            errorMessage={descriptionError}
            optionalText="(optional)"
            description={'What’s this channel about?'}
          >
            <Input
              handleChange={handleDescription}
              value={channelDescription}
              maxLength={MAX_CHANNEL_DESCRIPTION}
            />
          </ModalInputSection>
          <ModalInputSection
            name="Make private"
            optionalText={
              isPrivate
                ? 'This can’t be undone. A private channel cannot be made public later on.'
                : 'When a channel is set to private, it can only be viewed or joined by invitation.'
            }
          >
            <ToggleButton
              handleChange={handlePrivateOption}
              value={isPrivate}
            />
          </ModalInputSection>
          <Button
            handleClick={submitChannelInfo}
            children="Create"
            disabled={nameError || !channelName || descriptionError}
          />
        </StyledModalContent>
      </ModalForm>
    </Modal>
  )
}
const ModalForm = styled.div`
  border-radius: 8px;
`
const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`
const StyledModalContent = styled.div`
  padding: 15px;
`

export default CreateChannelModal
