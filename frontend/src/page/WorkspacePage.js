import React, { useState, Suspense } from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { modalAtom } from '../store'
import { throttle } from '../util'
import ChannelList from '../organism/ChannelList'
import ChannelHeader from '../organism/ChannelHeader'

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
        <ChannelListArea width={lineWidth}>
          <ChannelList {...props} />
        </ChannelListArea>
        <ListLine draggable="true" onDrag={e => throttle(moveLine(e), 100)} />
        <ContentsArea width={lineWidth}>
          <ChatArea>
            <ChatHeader>
              <ChannelHeader {...props} />
            </ChatHeader>
            <ChatContents>채팅방 내역 / 메시지에디터 위치</ChatContents>
          </ChatArea>
          <SideBarArea></SideBarArea>
        </ContentsArea>
      </MainArea>
    </PageStyle>
  )
}

const PageStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`
const GlobalHeader = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  background: red;
`
const MainArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

const ChannelListArea = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width}%;
  height: 100%;
`

const ListLine = styled.div`
  opacity: 0;
  width: 6px;
  height: 100%;
  background-color: black;
  cursor: col-resize;
  margin: 0 -2px;
  &:hover {
    background: black;
    width: 6px;
    margin: 0;
  }
`

const ContentsArea = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => 100 - props.width}%;
  height: 100%;
  background: yellow;
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
  height: 10%;
  background: gray;
`

const ChatContents = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
`

const SideBarArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 30%;
`

export default WorkspacePage
