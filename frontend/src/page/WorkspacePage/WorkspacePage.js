import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useParams, Route } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { modalRecoil } from '../../store'

import ChannelList from '../../container/ChannelList'
import ChannelListHeader from '../../presenter/ChannelListHeader'
import ChatRoom from '../../container/ChatRoom'
import SideThreadBar from '../../container/SideThreadBar'
import { COLOR } from '../../constant/style'
import Icon from '../../presenter/Icon'
import { TOOLS } from '../../constant/icon'
import useWorkspace from '../../hooks/useWorkspace'
import useSocket from '../../hooks/useSocket'
import DraggableBoundaryLine from '../../presenter/DraggableBoundaryLine'
import GlobalHeader from '../../container/GlobalHeader'

function WorkspacePage() {
  const { channelId } = useParams()
  const [listWidth, setListWidth] = useState(250)
  const [sidebarWidth, setSidebarWidth] = useState(0)
  const modal = useRecoilValue(modalRecoil)
  const [workspaceUserInfo] = useWorkspace()

  useSocket()

  useEffect(() => {
    if (Notification.permission !== 'denied') {
      Notification.requestPermission()
    }
  }, [])

  const switching = () => {
    switch (channelId) {
      case 'threads':
        return ConstructionPage()
      case 'all-dms':
        return ConstructionPage()
      case 'saved-page':
        return ConstructionPage()
      case 'activity-page':
        return ConstructionPage()
      case 'more':
        return ConstructionPage()
      default:
        return workspaceUserInfo && <ChatRoom width={sidebarWidth} />
    }
  }

  return (
    <PageStyle>
      {modal}
      <GlobalHeader />
      <MainArea>
        <ChannelListSection width={listWidth}>
          <ChannelListHeaderArea>
            <ChannelListHeader workspaceUserInfo={workspaceUserInfo} />
          </ChannelListHeaderArea>
          <ChannelListArea>
            <ChannelList />
          </ChannelListArea>
        </ChannelListSection>
        <DraggableBoundaryLine setWidth={setListWidth} min="150" max="450" />

        <ContentsArea width={listWidth}>
          {switching()}

          <Route exact path={'/workspace/:workspaceId/:channelId/:chatId'}>
            <SideThreadBar
              sidebarWidth={sidebarWidth}
              setSidebarWidth={setSidebarWidth}
            />
          </Route>
        </ContentsArea>
      </MainArea>
    </PageStyle>
  )
}

const ConstructionPage = () => {
  return (
    <SwitchContentsArea>
      <p>
        <Icon icon={TOOLS} size="100px" color={COLOR.LABEL_SELECT_TEXT} />
      </p>
      <p>준비 중인 페이지입니다.</p>
    </SwitchContentsArea>
  )
}

const PageStyle = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const MainArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100% - 40px);
`

const ChannelListSection = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width}px;
  color: ${COLOR.LABEL_DEFAULT_TEXT};
  height: 100%;
`

const ChannelListHeaderArea = styled.div`
  width: 100%;
  height: 60px;
  background: ${COLOR.BACKGROUND_CHANNEL_LIST};
  color: ${COLOR.LABEL_DEFAULT_TEXT};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
`

const ChannelListArea = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  background: ${COLOR.BACKGROUND_CHANNEL_LIST};
  color: ${COLOR.LABEL_DEFAULT_TEXT};
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 15px;
`

const ContentsArea = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => `calc(100% - ${props.width}px)`};
  height: 100%;
`
const SwitchContentsArea = styled.div`
  height: 100%;
  width: 100%;
  font-size: 20px;
  color: ${COLOR.LABEL_DEFAULT_TEXT};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: ${COLOR.BACKGROUND_CONTENTS};
`

export default WorkspacePage
