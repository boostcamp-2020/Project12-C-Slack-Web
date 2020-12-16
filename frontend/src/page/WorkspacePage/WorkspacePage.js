import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useParams, Route } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { modalRecoil } from '../../store'

import { throttle } from '../../util'
import ChannelList from '../../container/ChannelList'
import ChannelListHeader from '../../presenter/ChannelListHeader'
import ChatRoom from '../../container/ChatRoom'
import SideThreadBar from '../../container/SideThreadBar'
import { COLOR } from '../../constant/style'
import Icon from '../../presenter/Icon'
import { TOOLS } from '../../constant/icon'
import useWorkspace from '../../hooks/useWorkspace'
import useSocket from '../../hooks/useSocket'

function WorkspacePage() {
  const { channelId, chatId } = useParams()
  const [lineWidth, setLineWidth] = useState(20)
  const [sideBarWidth, setSideBarWidth] = useState(30)
  const modal = useRecoilValue(modalRecoil)
  const [workspaceUserInfo] = useWorkspace()
  useSocket()

  useEffect(() => {
    if (chatId !== undefined) setSideBarWidth(30)
    else setSideBarWidth(0)
  }, [chatId])

  const moveLine = e => {
    if (e.pageX === 0) return false
    let mouse = e.pageX
    let viewWidth = e.view.innerWidth

    let width = (mouse / viewWidth) * 100
    if (width < 20) {
      setLineWidth(20)
    } else {
      setLineWidth(width)
    }
  }

  const switching = () => {
    switch (channelId) {
      case 'threads':
        return ConstructionPage(100 - sideBarWidth)
      case 'all-dms':
        return ConstructionPage(100 - sideBarWidth)
      case 'saved-page':
        return ConstructionPage(100 - sideBarWidth)
      case 'activity-page':
        return ConstructionPage(100 - sideBarWidth)
      case 'more':
        return ConstructionPage(100 - sideBarWidth)
      default:
        return <ChatRoom width={100 - sideBarWidth} />
    }
  }

  return (
    <PageStyle>
      {modal}
      <GlobalHeader>글로벌 헤더 위치</GlobalHeader>
      <MainArea>
        <ChannelListSection width={lineWidth}>
          <ChannelListHeaderArea>
            <ChannelListHeader workspaceUserInfo={workspaceUserInfo} />
          </ChannelListHeaderArea>
          <ChannelListArea>
            <ChannelList />
          </ChannelListArea>
        </ChannelListSection>
        <ListLine draggable="true" onDrag={throttle(moveLine, 100)} />
        <ContentsArea width={lineWidth}>
          {switching()}

          <Route
            path={'/workspace/:workspaceId/:channelId/:chatId'}
            component={SideThreadBar}
          />
        </ContentsArea>
      </MainArea>
    </PageStyle>
  )
}

const ConstructionPage = SideBarWidth => {
  return (
    <SwitchContentsArea width={SideBarWidth}>
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
const GlobalHeader = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  background: ${COLOR.GLOBAL_HEADER_BACKGROUND};
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
  width: ${props => props.width}%;
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

const ListLine = styled.div`
  opacity: 0;
  width: 4px;
  height: 100%;
  cursor: col-resize;
  margin: 0 -2px;
  &:hover {
    background: black;
    opacity: 100;
    position: relative;
    ::after {
      content: ' ';
      position: absolute;
      display: block;
      width: 4px;
      height: 100%;
      left: 0;
      top: 0;
      background-color: white;
    }
  }

  &:active {
    opacity: 0;
  }
`

const ContentsArea = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => 100 - props.width}%;
  height: 100%;
`
const SwitchContentsArea = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  font-size: 20px;
  color: ${COLOR.LABEL_DEFAULT_TEXT};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: ${COLOR.BACKGROUND_CONTENTS};
`

export default WorkspacePage
