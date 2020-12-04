import React, { useState } from 'react'
import styled from 'styled-components'
import { Route, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { modalAtom } from '../../store'

import ChannelList from '../../organism/ChannelList'
import ChatRoom from '../../organism/ChatRoom'

function WorkspacePage(props) {
  const [lineWidth, setLineWidth] = useState(30)
  const Modal = useRecoilValue(modalAtom)
  const moveLine = e => {
    if (e.pageX === 0) return false
    let mouse = e.pageX
    let viewWidth = e.view.innerWidth

    let width = (mouse / viewWidth) * 100
    if (width < 5) {
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
          <ChannelList />
        </ChannelListArea>
        <ListLine draggable="true" onDrag={moveLine} />
        <ContentsArea width={lineWidth}>
          <Route path="/:channelId" component={ChatRoom} />
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
  width: 6px;
  height: 100%;
  background: white;
  cursor: pointer;
  margin: 0 -2px;
  &:hover {
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

const SideBarArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 30%;
`

export default WorkspacePage
