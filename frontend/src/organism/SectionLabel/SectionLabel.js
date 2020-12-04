import React, { useState } from 'react'
import { useParams } from 'react-router'
import styled, { keyframes, css } from 'styled-components'
import Icon from '../../atom/Icon'
import { ELLIPSISV, PLUS } from '../../constant/icon'
import { Link } from 'react-router-dom'
import ChannelCard from '../../atom/ChannelCard'
import DirectMessageCard from '../../atom/DirectMessageCard'
import { faBorderNone } from '@fortawesome/free-solid-svg-icons'

const ICON_SIZE = 13
const LABEL_DEFAULT_COLOR = '#a3a3a6'

function SectionLabel(props) {
  const [isOpen, setIsOpen] = useState(true)
  const { sectionName, lists } = props
  const { channelId } = useParams()

  const openSection = () => {
    setIsOpen(!isOpen)
  }

  const openChannelsMenu = e => {
    e.stopPropagation()
  }

  const renderChannelCards =
    lists.length !== 0 ? (
      lists.map((list, idx) => {
        if (list.channelId.channelType === 2) {
          return (
            <LinkStyle key={idx} to={'/workspace/' + list.channelId._id}>
              <ChannelLabel
                curr={list.channelId._id === channelId}
                isOpen={isOpen}
              >
                <DirectMessageCard
                  directMessage={list.channelId}
                  color={LABEL_DEFAULT_COLOR}
                />
              </ChannelLabel>
            </LinkStyle>
          )
        }
        return (
          <LinkStyle key={idx} to={'/workspace/' + list.channelId._id}>
            <ChannelLabel
              curr={list.channelId._id === channelId}
              isOpen={isOpen}
            >
              <ChannelCard
                channel={list.channelId}
                color={
                  list.channelId._id === channelId
                    ? 'white'
                    : LABEL_DEFAULT_COLOR
                }
              ></ChannelCard>
            </ChannelLabel>
          </LinkStyle>
        )
      })
    ) : (
      <div></div>
    )

  return (
    <SectionLabelStyle>
      <TitleArea onClick={openSection}>
        <IconArea>
          <TriangleIcon isOpen={isOpen}>▶</TriangleIcon>
        </IconArea>
        <SectionTitle>
          <SectionName>{sectionName}</SectionName>
          <ButtonRelativeArea>
            <ButtonAbsoluteArea>
              <ChannelSectionBtn onClick={openChannelsMenu}>
                <Icon
                  icon={ELLIPSISV}
                  color={LABEL_DEFAULT_COLOR}
                  size={ICON_SIZE + 'px'}
                />
              </ChannelSectionBtn>
              {sectionName === 'Channels' && (
                <ChannelSectionBtn onClick={openChannelsMenu}>
                  <Icon
                    icon={PLUS}
                    color={LABEL_DEFAULT_COLOR}
                    size={ICON_SIZE + 'px'}
                  />
                </ChannelSectionBtn>
              )}
              {sectionName === 'Direct messages' && (
                <ChannelSectionBtn onClick={openChannelsMenu}>
                  <Icon
                    icon={PLUS}
                    color={LABEL_DEFAULT_COLOR}
                    size={ICON_SIZE + 'px'}
                  />
                </ChannelSectionBtn>
              )}
            </ButtonAbsoluteArea>
          </ButtonRelativeArea>
        </SectionTitle>
      </TitleArea>
      <ListArea isOpen={isOpen}>{renderChannelCards}</ListArea>
    </SectionLabelStyle>
  )
}

const ChannelLabel = styled.div`
  width: auto;
  padding-left: 20px;
  cursor: pointer;
  &:hover {
    background-color: ${props => {
      if (!props.curr) return 'rgba(255, 255, 0, 0.2)'
      return null
    }};
  }
  display: ${props => {
    if (!props.isOpen && !props.curr) {
      return 'none'
    }
  }};
  background: ${props => {
    if (props.curr) {
      return '#1363A2'
    }
  }};
  color: ${props => {
    if (props.curr) {
      return 'white'
    } else {
      return '#a3a3a6'
    }
  }};
`

const SectionLabelStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: baseline;
  padding: 4px 0;
`

const LinkStyle = styled(Link)`
  text-decoration: none;
`

const IconArea = styled.div`
  width: 18px;
  height: 18px;
  text-align: center;
  padding: 4px;
`
const TriangleIcon = styled.div`
  width: 18px;
  height: 18px;
  text-align: center;
  transform: rotate(90deg);
  ${props =>
    props.isOpen
      ? css`
          animation: 0.1s linear ${openSection};
          animation-direction: alternate;
          animation-fill-mode: forwards;
        `
      : css`
          animation: 0.1s linear ${closeSection};
          animation-direction: alternate;
          animation-fill-mode: forwards;
        `}
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
  color: #a3a3a6;
  word-break: break-all;
  display: inline-block;
`

const ChannelSectionBtn = styled.div`
  opacity: 0;
  width: auto;
  min-width: 18px;
  height: 18px;
  display: block;
  text-align: center;
  color: #a3a3a6;
  padding: 4px;
  border-radius: 3px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const showButton = keyframes`
  0% {
    opacity:0;
  }
  50% {
    opacity:0;
  }
  100% {
    opacity:100;
  }`

const TitleArea = styled.div`
  width: 100%;
  padding: 2px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  user-select: none;

  cursor: pointer;
  &:hover {
    ${ChannelSectionBtn} {
      animation: 0.2s linear ${showButton};
      animation-direction: alternate;
      animation-fill-mode: forwards;
    }
  }
`

const ButtonRelativeArea = styled.div`
  position: relative;
  height: 26px;
`

const ButtonAbsoluteArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: row;
`

const ListArea = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const openSection = keyframes`
  0% {
    transform: rotate( 0deg);
  }
  100% {
    transform: rotate( 90deg);
  }`

const closeSection = keyframes`
0% {
  transform: rotate( 90deg);
}
100% {
  transform: rotate( 0deg);
}`

export default SectionLabel
