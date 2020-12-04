import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import request from '../../util/request'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { COLOR } from '../../constant/style'
import Icon from '../Icon'
import { STAR, COLOREDSTAR } from '../../constant/icon'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import useChannelList from '../../hooks/useChannelList'

function ChannelStarBtn(props) {
  const channel = props.channel
  const section = channel.sectionName

  const [Channels, setChannels] = useChannelList()
  const [sectionInfo, setSectionInfo] = useState(section)

  const history = useHistory()
  const channelIdParams = props.match.params.channelId

  useEffect(() => {
    setSectionInfo(props.channel.sectionName)
  }, [channel])

  const updateSection = async () => {
    try {
      let sectionName = null
      if (sectionInfo === null) sectionName = 'Starred'

      const { data } = await request.PATCH('/api/channel/section', {
        workspaceUserInfoId: '5fc4fe427b2d5f6ae44dc15e',
        channelId: channelIdParams,
        sectionName,
      })
      if (data.success) {
        setSectionInfo(sectionName)
      }

      //채널 목록 재요청
      setChannels()
    } catch (err) {
      console.log(err)
      toast.error('채널 섹션 정보를 가져오는데 오류가 발생했습니다.', {
        onClose: () => history.goBack(),
      })
    }
  }

  return (
    <StarIconStyle onClick={updateSection}>
      {sectionInfo !== null ? (
        <Icon icon={COLOREDSTAR} color={COLOR.STARBLUE} />
      ) : (
        <Icon icon={STAR} color={COLOR.STARBLUE} />
      )}
    </StarIconStyle>
  )
}

const StarIconStyle = styled.div`
  margin-left: 5px;
  cursor: pointer;
`

export default ChannelStarBtn
