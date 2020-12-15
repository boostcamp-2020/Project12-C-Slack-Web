import React, { memo } from 'react'
import styled from 'styled-components'
import UserProfileImg from '../../UserProfileImg'
import { COLOR } from '../../../constant/style'
import { go, Lazy, take, map } from '../../../util/fx'
const MAX_NUMBER_OF_PROFILES = 5
const SMALL_SIZE = 24
const ViewThreadButton = memo(({ reply }) => {
  return (
    <ViewThreadContainer>
      {go(
        reply,
        Lazy.map(item => item?.userInfo?.profileUrl),
        Lazy.takeNoneDuplicate,
        take(MAX_NUMBER_OF_PROFILES),
        map((item, index) => (
          <UserProfileImg
            key={index}
            user={{ profileUrl: item }}
            size={SMALL_SIZE}
          />
        )),
      )}
      <ReplyCounts>
        {reply.length} {reply.length === 1 ? 'reply' : 'replies'}
      </ReplyCounts>
    </ViewThreadContainer>
  )
})

const ViewThreadContainer = styled.div`
  display: flex;
`
const ReplyCounts = styled.div`
  margin-left: 5px;
`
export default ViewThreadButton
