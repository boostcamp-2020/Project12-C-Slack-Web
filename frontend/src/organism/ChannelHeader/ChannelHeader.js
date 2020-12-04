import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'
import Icon from '../../atom/Icon'
import { ADDUSER, INFOCIRCLE } from '../../constant/icon'
import ChannelCard from '../../atom/ChannelCard'
import ChannelStarBtn from '../../atom/ChannelStarBtn'
import ChannelPinBtn from '../../atom/ChannelPinBtn'
import ChannelTopicBtn from '../../atom/ChannelTopicBtn'
import ChannelMemberThumbnail from '../../atom/ChannelMemberThumbnail'
import { modalAtom } from '../../store'
import { useRecoilState } from 'recoil'
import InviteUserToChannelModal from '../InviteUserToChannelModal'
import useCurrentChannelInfo from '../../hooks/useCurrentChannelInfo'

const TEXT_COLOR = '#D1D2D3'
const SUB_TEXT_COLOR = '#e8e8e8b3'

function ChannelHeader(props) {
  const { channelId } = props.match.params
  const [channelInfo, setChannelInfo] = useCurrentChannelInfo()
  const [modal, setModal] = useRecoilState(modalAtom)

  useEffect(() => {
    setChannelInfo(channelId)
  }, [channelId])

  const openAddUserModal = () => {
    setModal(<InviteUserToChannelModal handleClose={() => setModal(null)} />)
  }

  return Object.keys(channelInfo).length !== 0 ? (
    <ChannelHeaderStyle>
      <ChannelInfo>
        <MainInfo>
          <ChannelCard channel={channelInfo.channelId} color={TEXT_COLOR} />
          <ChannelStarBtn channel={channelInfo} {...props} />
        </MainInfo>
        <SubInfo>
          {channelInfo.pinnedCount !== 0 && (
            <>
              <ChannelPinBtn count={channelInfo.pinnedCount} />
              <div>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
            </>
          )}
          <ChannelTopicBtn topic={channelInfo.channelId.topic} />
        </SubInfo>
      </ChannelInfo>
      <ChannelMemberInfo color={SUB_TEXT_COLOR}>
        <ChannelMemberThumbnail
          member={channelInfo.member}
          memberNum={channelInfo.member.length}
        />
      </ChannelMemberInfo>
      <ChannelOption>
        <IconBtn onClick={openAddUserModal}>
          <Icon icon={ADDUSER} color={SUB_TEXT_COLOR} />
        </IconBtn>
        <IconBtn>
          <Icon icon={INFOCIRCLE} color={SUB_TEXT_COLOR} />
        </IconBtn>
      </ChannelOption>
    </ChannelHeaderStyle>
  ) : (
    <div>loading</div>
  )
}

const ChannelHeaderStyle = styled.div`
  margin: auto 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
`

const ChannelInfo = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const MainInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: center;
  font-weight: 800;
  font-size: 17px;
  cursor: pointer;
`

const SubInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 13px;
  cursor: pointer;
`

const ChannelMemberInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: ${({ color }) => color};
  cursor: pointer;
`

const ChannelOption = styled.div`
  display: flex;
  flex-direction: row;
`

const IconBtn = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 5px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: rgba(155, 155, 155, 0.2);
  }
`

export default ChannelHeader
