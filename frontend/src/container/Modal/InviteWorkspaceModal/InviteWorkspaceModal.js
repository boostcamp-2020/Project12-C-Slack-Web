import React, { useEffect, useState } from 'react'
import Modal from '../../../presenter/Modal'
import styled from 'styled-components'
import Button from '../../../presenter/Button'
import Title from '../../../presenter/Title'
import Icon from '../../../presenter/Icon'
import { CLOSE } from '../../../constant/icon'
import { COLOR } from '../../../constant/style'
import { inviteWorkspace } from '../../../api/workspace'
import { useParams } from 'react-router-dom'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_API_URL

const InviteWorkspaceModal = ({ handleClose }) => {
  const [inviteURL, setInviteURL] = useState('생성중...')
  const { workspaceId } = useParams()

  useEffect(() => {
    ;(async () => {
      const data = await inviteWorkspace({ workspaceId })
      if (data) setInviteURL(`${baseURL}/api/workspace/invite/${data}`)
      else setInviteURL('초대 링크 생성 실패')
    })()
  }, [])

  return (
    <>
      <Modal handleClose={handleClose}>
        <StyledModalHeader>
          <Title isBold={true}>Invite to workspace</Title>
          <Button type="icon" handleClick={handleClose}>
            <Icon icon={CLOSE} color={COLOR.GRAY} />
          </Button>
        </StyledModalHeader>
        <StyledModalContent>
          <StyeldTextarea value={inviteURL}></StyeldTextarea>
        </StyledModalContent>
      </Modal>
    </>
  )
}

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`
const StyledModalContent = styled.div`
  padding: 15px;
  text-align: center;
`

const StyeldTextarea = styled.textarea`
  display: inline;
  width: 95%;
  resize: none;
  background: ${COLOR.BACKGROUNT_MODAL_GRAY};
`

export default InviteWorkspaceModal
