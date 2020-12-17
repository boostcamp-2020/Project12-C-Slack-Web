import React, { memo } from 'react'
import styled from 'styled-components'
import UserProfileImg from '../../UserProfileImg'
import calculateTime from '../../../util/calculateTime'
import { go, Lazy, take, map } from '../../../util/fx'
import { COLOR } from '../../../constant/style'
const MAX_NUMBER_OF_PROFILES = 5
const SMALL_SIZE = 24
const ViewThreadButton = memo(({ reply = [] }) => {
  const [lastReply] = reply.slice(-1)
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
        {reply.length} {reply.length === 1 ? 'reply ' : 'replies '}
        <LastModifiedTime>
          {calculateTime(lastReply?.createdAt)}
        </LastModifiedTime>
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
const LastModifiedTime = styled.span`
  color: ${COLOR.GRAY};
`
export default ViewThreadButton
