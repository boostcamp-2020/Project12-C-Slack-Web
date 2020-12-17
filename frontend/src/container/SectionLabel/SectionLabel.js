import React, { useState } from 'react'
import { useParams } from 'react-router'
import styled, { keyframes, css } from 'styled-components'
import Icon from '../../presenter/Icon'
import { ELLIPSISV, PLUS } from '../../constant/icon'
import { Link } from 'react-router-dom'
import { COLOR, SIZE } from '../../constant/style'
import ChannelCard from '../../presenter/ChannelCard'
import DirectMessageCard from '../../presenter/DirectMessageCard'
import AddButton from '../../presenter/Button/AddButton'
import { modalRecoil } from '../../store'
import { useSetRecoilState } from 'recoil'
import InviteWorkspaceModal from '../Modal/InviteWorkspaceModal'
import CreateChannelModal from '../Modal/CreateChannelModal/CreateChannelModal'
import ChannelBrowserModal from '../Modal/ChannelBrowserModal'
import InviteUserToChannelModal from '../Modal/InviteUserToChannelModal'

function SectionLabel(props) {
  const [isOpen, setIsOpen] = useState(true)
  const { sectionName, lists } = props
  const { channelId, workspaceId } = useParams()
  const setModal = useSetRecoilState(modalRecoil)
  const openSection = () => {
    setIsOpen(!isOpen)
  }

  const openChannelsMenu = e => {
    e.stopPropagation()
  }

  const openAddUserModal = e => {
    e.stopPropagation()
    setModal(
      <InviteUserToChannelModal type="DM" handleClose={() => setModal(null)} />,
    )
  }

  const renderChannelCards =
    lists.length !== 0 ? (
      lists.map((list, idx) => {
        return (
          <LinkStyle
            key={idx}
            to={`/workspace/${workspaceId}/${list.channelId._id}`}
          >
            <ChannelLabel
              curr={list.channelId._id === channelId}
              isOpen={isOpen}
            >
              {list.channelId.channelType === 2 ? (
                <DirectMessageCard directMessage={list.channelId} />
              ) : (
                <ChannelCard
                  channel={list.channelId}
                  color={
                    list.channelId._id === channelId
                      ? 'white'
                      : COLOR.LABEL_DEFAULT_TEXT
                  }
                />
              )}
            </ChannelLabel>
          </LinkStyle>
        )
      })
    ) : (
      <div></div>
    )

  const openCreateChannelModal = () => {
    setModal(<CreateChannelModal handleClose={() => setModal(null)} />)
  }

  const openInviteWorkspaceModal = () => {
    setModal(<InviteWorkspaceModal handleClose={() => setModal(null)} />)
  }

  const openChannelBrowserModal = e => {
    e.stopPropagation()
    setModal(<ChannelBrowserModal handleClose={() => setModal(null)} />)
  }

  const addButtons =
    sectionName === 'Direct messages' ? (
      <AddButton
        isOpen={isOpen}
        title="Add teammates"
        onClick={openInviteWorkspaceModal}
      />
    ) : sectionName === 'Channels' ? (
      <AddButton
        isOpen={isOpen}
        title="Add channels"
        onClick={openCreateChannelModal}
      />
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
          <ButtonArea>
            <ChannelSectionBtn onClick={openChannelsMenu}>
              <Icon
                icon={ELLIPSISV}
                color={COLOR.LABEL_DEFAULT_TEXT}
                size={SIZE.ICON_SIZE + 'px'}
              />
            </ChannelSectionBtn>
            {sectionName === 'Channels' && (
              <ChannelSectionBtn onClick={openChannelBrowserModal}>
                <Icon
                  icon={PLUS}
                  color={COLOR.LABEL_DEFAULT_TEXT}
                  size={SIZE.ICON_SIZE + 'px'}
                />
              </ChannelSectionBtn>
            )}
            {sectionName === 'Direct messages' && (
              <ChannelSectionBtn onClick={openAddUserModal}>
                <Icon
                  icon={PLUS}
                  color={COLOR.LABEL_DEFAULT_TEXT}
                  size={SIZE.ICON_SIZE + 'px'}
                />
              </ChannelSectionBtn>
            )}
          </ButtonArea>
        </SectionTitle>
      </TitleArea>
      <ListArea isOpen={isOpen}>
        {renderChannelCards}
        {addButtons}
      </ListArea>
    </SectionLabelStyle>
  )
}

const ChannelLabel = styled.div`
  width: auto;
  padding: 3px 10px 3px 30px;

  cursor: pointer;
  &:hover {
    background-color: ${props => {
      if (!props.curr) return COLOR.LABEL_HOVER_BACKGROUND
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
      return COLOR.LABEL_SELECT_BACKGROUND
    }
  }};
  color: ${props => {
    if (props.curr) {
      return COLOR.LABEL_SELECT_TEXT
    } else {
      return COLOR.LABEL_DEFAULT_TEXT
    }
  }};
`

const SectionLabelStyle = styled.div`
  width: auto;
  padding: 6px 0;
  color: ${COLOR.LABEL_DEFAULT_TEXT};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const LinkStyle = styled(Link)`
  text-decoration: none;
`

const IconArea = styled.div`
  width: 18px;
  height: 18px;
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
  width: calc(100% - 25px);
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const SectionName = styled.div`
  padding-left: 10px;
  word-break: break-all;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const ChannelSectionBtn = styled.div`
  opacity: 0;
  width: auto;
  min-width: 18px;
  height: 18px;
  text-align: center;
  padding: 4px;
  display: block;
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

const ButtonArea = styled.div`
  display: none;
  flex-direction: row;
`

const TitleArea = styled.div`
  width: auto;
  padding: 2px 10px;
  user-select: none;
  display: flex;
  align-items: baseline;
  flex-direction: row;

  cursor: pointer;
  &:hover {
    ${ChannelSectionBtn} {
      animation: 0.2s linear ${showButton};
      animation-direction: alternate;
      animation-fill-mode: forwards;
    }
    ${ButtonArea} {
      display: flex;
    }
  }
`

const ListArea = styled.div`
  width: 100%;
  display: flex;
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
