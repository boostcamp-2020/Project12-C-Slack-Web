import React, { useState, Suspense } from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { modalAtom } from '../store'
import { throttle } from '../util'
import ChannelList from '../organism/ChannelList'
import ChannelHeader from '../organism/ChannelHeader'
import ChannelListHeader from '../atom/ChannelListHeader'
import { COLOR } from '../constant/style'

function WorkspacePage(props) {
  const [lineWidth, setLineWidth] = useState(30)
  const Modal = useRecoilValue(modalAtom)

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

  return (
    <PageStyle>
      {Modal}
      <GlobalHeader>글로벌 헤더 위치</GlobalHeader>
      <MainArea>
        <ChannelListSection width={lineWidth}>
          <ChannelListHeaderArea>
            <ChannelListHeader />
          </ChannelListHeaderArea>
          <ChannelListArea>
            <ChannelList {...props} />
          </ChannelListArea>
        </ChannelListSection>
        <ListLine draggable="true" onDrag={e => throttle(moveLine(e), 100)} />
        <ContentsArea width={lineWidth}>
          <ChatArea>
            <ChatHeader>
              <ChannelHeader {...props} />
            </ChatHeader>
            <ChatContents>채팅방 내역 / 메시지에디터 위치</ChatContents>
          </ChatArea>
          <SideBarArea>
            <SideBarHeader></SideBarHeader>
            <SideBarContents></SideBarContents>
          </SideBarArea>
        </ContentsArea>
      </MainArea>
    </PageStyle>
  )
}

const PageStyle = styled.div`
  width: 100%;
  height: 100vh;
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

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 70%;
  background: blue;
`

const ChatHeader = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background: ${COLOR.BACKGROUND_CONTENTS};
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const ChatContents = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 60px);
  background: ${COLOR.BACKGROUND_CONTENTS};
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const SideBarArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  background: ${COLOR.BACKGROUND_CONTENTS};
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const SideBarHeader = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 0;
`

const SideBarContents = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 0;
`

export default WorkspacePage
