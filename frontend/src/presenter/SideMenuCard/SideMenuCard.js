import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from '../Icon'

function SideMenuCard({ icon, children, linkUrl }) {
  const parameters = useParams()
  return (
    <SideMenuCardStyle currentChannel={parameters.channelId === linkUrl}>
      <LinkStyle to={'/workspace/' + parameters.workspaceId + '/' + linkUrl}>
        <IconArea>
          <Icon
            icon={icon}
            color={parameters.channelId === linkUrl ? 'white' : '#a3a3a6'}
          />
        </IconArea>
        <SectionTitle curr={parameters.channelId === linkUrl}>
          <SectionName>{children}</SectionName>
        </SectionTitle>
      </LinkStyle>
    </SideMenuCardStyle>
  )
}

const SideMenuCardStyle = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  user-select: none;

  cursor: pointer;
  &:hover {
    background-color: ${props => {
      if (!props.currentChannel) return 'rgba(255, 255, 255, 0.1)'
      return null
    }};
  }
  background: ${props => {
    if (props.currentChannel) {
      return '#1363A2'
    }
  }};
  color: ${props => {
    if (props.currentChannel) {
      return 'white'
    } else {
      return '#a3a3a6'
    }
  }};
`

const LinkStyle = styled(Link)`
  width: 100%;
  padding: 4px 10px;
  color: inherit;
  display: inherit;
  text-decoration: none;
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
