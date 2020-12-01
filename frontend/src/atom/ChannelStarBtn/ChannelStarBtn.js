import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import request from '../../util/request'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { COLOR } from '../../constant/style'
import Icon from '../Icon'
import { STAR, COLOREDSTAR } from '../../constant/icon'

function ChannelStarBtn(props) {
  const section = props.section
  const [sectionInfo, setSectionInfo] = useState(null)
  const history = useHistory()
  useEffect(() => {
    section !== undefined ? setSectionInfo(section.name) : setSectionInfo(null)
  }, [])

  const updateSection = async () => {
    try {
      let sectionName = null
      if (sectionInfo === null) sectionName = 'Starred'

      const data = await request.PATCH('/api/channel/section', {
        workspaceUserInfoId: '5fc4fe427b2d5f6ae44dc15e',
        channelId: '5fc4fe66f303676bad052e9b',
        sectionName,
      })
      if (data.data.success) {
        setSectionInfo(sectionName)
      } else throw '채널 섹션 정보 요청 오류'
    } catch (err) {
      toast.error('채널 섹션 정보를 가져오는데 오류가 발생했습니다.', {
        onClose: () => history.goBack(),
      })
    }
  }

  return (
    <StarIconStyle onClick={updateSection}>
      {sectionInfo !== null ? (
        <Icon icon={STAR} color={COLOR.STARBLUE} />
      ) : (
        <Icon icon={COLOREDSTAR} color={COLOR.STARBLUE} />
      )}
    </StarIconStyle>
  )
}

const StarIconStyle = styled.div`
  margin-left: 5px;
  cursor: pointer;
`

export default ChannelStarBtn
