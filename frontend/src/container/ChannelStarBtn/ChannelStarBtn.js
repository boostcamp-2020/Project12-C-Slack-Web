import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import request from '../../util/request'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { COLOR } from '../../constant/style'
import Icon from '../../presenter/Icon'
import { workspaceRecoil } from '../../store'
import { STAR, COLOREDSTAR } from '../../constant/icon'
import { useRecoilValue } from 'recoil'
import { isEmpty } from '../../util'
import useChannelList from '../../hooks/useChannelList'

function ChannelStarBtn({ channel }) {
  const section = channel.sectionName
  const { channelId } = useParams()
  const [, setChannels] = useChannelList()
  const [sectionInfo, setSectionInfo] = useState(section)
  const workspaceUserInfo = useRecoilValue(workspaceRecoil)

  const history = useHistory()

  useEffect(() => {
    setSectionInfo(channel.sectionName)
  }, [channel])

  const updateSection = async () => {
    try {
      let sectionName = null
      if (isEmpty(sectionInfo)) sectionName = 'Starred'

      const { data } = await request.PATCH('/api/channel/section', {
        workspaceUserInfoId: workspaceUserInfo._id,
        channelId,
        sectionName,
      })
      if (data.success) {
        setSectionInfo(sectionName)
      }

      //채널 목록 재요청
      setChannels()
    } catch (err) {
      toast.error('채널 섹션 정보를 가져오는데 오류가 발생했습니다.', {
        onClose: () => history.goBack(),
      })
    }
  }

  return (
    <StarIconStyle onClick={updateSection}>
      {!isEmpty(sectionInfo) ? (
        <Icon icon={COLOREDSTAR} color={COLOR.STARBLUE} size="12px" />
      ) : (
        <Icon icon={STAR} color={COLOR.STARBLUE} size="12px" />
      )}
    </StarIconStyle>
  )
}

const StarIconStyle = styled.div`
  height: 12px;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  cursor: pointer;
`

export default ChannelStarBtn
