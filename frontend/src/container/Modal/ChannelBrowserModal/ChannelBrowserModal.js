import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import ChannelBrowserCard from '../../../presenter/ChannelBrowserCard'
import { useParams } from 'react-router-dom'

import { workspaceRecoil } from '../../../store'
import Modal from '../../../presenter/Modal'
import Title from '../../../presenter/Title'
import Icon from '../../../presenter/Icon'
import { getChannelBrowserData } from '../../../api/channel'
import Button from '../../../presenter/Button'
import { CLOSE } from '../../../constant/icon'
import { COLOR } from '../../../constant/style'

function ChannelBrowserModal({ handleClose }) {
  const [channelList, setChannelList] = useState([])
  const workspaceUserInfo = useRecoilValue(workspaceRecoil)
  const { workspaceId } = useParams()

  useEffect(() => {
    if (workspaceUserInfo) {
      ;(async () => {
        const channelList = await getChannelBrowserData({
          workspaceUserInfoId: workspaceUserInfo._id,
          workspaceId,
        })
        setChannelList(channelList)
      })()
    }
  }, [workspaceUserInfo])

  return (
    <Modal>
      <ChannelBrowserModalStyle>
        <Header>
          <Title isBold={true}>Channel Browser</Title>
          <Button type="icon" handleClick={handleClose}>
            <Icon icon={CLOSE} color={COLOR.GRAY} />
          </Button>
        </Header>
        <ChannelListArea>
          {channelList?.map((el, idx) => (
            <ChannelBrowserCard
              key={idx}
              {...el}
              handleClose={handleClose}
              workspaceUserInfoId={workspaceUserInfo._id}
            />
          ))}
        </ChannelListArea>
        <CloseBtnArea>
          <Button handleClick={handleClose} children="Close" />
        </CloseBtnArea>
      </ChannelBrowserModalStyle>
    </Modal>
  )
}

const ChannelBrowserModalStyle = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px;
`

const ChannelListArea = styled.div`
  width: 70%;
  height: 330px;
  border: 1px solid black;
  border-radius: 5px;
  overflow-y: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const CloseBtnArea = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 20px 50px 0 0;
`
export default ChannelBrowserModal
