import React, { useState, Suspense, useEffect } from 'react'
import styled from 'styled-components'
import { Route, useParams, useRouteMatch } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { modalAtom, workspace } from '../../store'
import { getWorkspaceUserInfo } from '../../api/workspace'
import usePromise from '../../hooks/usePromise'
import ChannelList from '../../organism/ChannelList'
import ChatRoom from '../../organism/ChatRoom'

function WorkspacePage(props) {
  const { path } = useRouteMatch()
  const { workspaceId } = useParams()
  const [lineWidth, setLineWidth] = useState(30)
  const Modal = useRecoilValue(modalAtom)
  const setWorkspaceUserInfo = useSetRecoilState(workspace)
  const [loading, resolved, error] = usePromise(
    () => getWorkspaceUserInfo({ workspaceId }),
    [],
  )
  if (loading) return <div>loading...</div>
  if (error) return <div>{error.toString()}</div>
  if (!resolved) return null
  setWorkspaceUserInfo(resolved)
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
    <Suspense fallback={<div>loading...</div>}>
      <PageStyle>
        {Modal}
        <GlobalHeader>글로벌 헤더 위치</GlobalHeader>
        <MainArea>
          <ChannelListArea width={lineWidth}>
            <ChannelList />
          </ChannelListArea>
          <ListLine draggable="true" onDrag={moveLine} />
          <ContentsArea width={lineWidth}>
            <Route path={`${path}/:channelId`} component={ChatRoom} />
            <SideBarArea></SideBarArea>
          </ContentsArea>
        </MainArea>
      </PageStyle>
    </Suspense>
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
