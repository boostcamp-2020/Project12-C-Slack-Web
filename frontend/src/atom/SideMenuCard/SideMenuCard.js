import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from '../Icon'

function SideMenuCard({ icon, color, children, linkUrl }) {
  const parameters = useParams()
  const [currChannel, setCurrChannel] = useState(null)
  useEffect(() => {
    if (parameters.channelId === linkUrl) {
      setCurrChannel(true)
    }
  }, [])

  return (
    <SideMenuCardStyle
      to={'/workspace/' + parameters.workspaceId + '/' + linkUrl}
      currChannel={currChannel}
    >
      <IconArea>
        <Icon icon={icon} color={currChannel ? 'white' : '#a3a3a6'} />
      </IconArea>
      <SectionTitle curr={currChannel}>
        <SectionName>{children}</SectionName>
      </SectionTitle>
    </SideMenuCardStyle>
  )
}

const SideMenuCardStyle = styled(Link)`
  width: auto;
  padding: 4px 10px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  user-select: none;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: ${props => {
      if (!props.currChannel) return 'rgba(255, 255, 255, 0.1)'
      return null
    }};
  }
  background: ${props => {
    if (props.currChannel) {
      return '#1363A2'
    }
  }};
  color: ${props => {
    if (props.currChannel) {
      return 'white'
    } else {
      return '#a3a3a6'
    }
  }};
`

const IconArea = styled.div`
  width: 18px;
  height: 18px;
  text-align: center;
  padding: 4px;
`

const SectionTitle = styled.div`
  width: calc(100% - 40px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

const SectionName = styled.div`
  padding-left: 10px;
  word-break: break-all;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export default SideMenuCard
