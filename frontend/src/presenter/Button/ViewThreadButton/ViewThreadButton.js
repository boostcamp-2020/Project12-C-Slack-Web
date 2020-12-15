import React, { memo } from 'react'
import styled from 'styled-components'
import UserProfileImg from '../../UserProfileImg'
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
      {reply.length} {reply.length === 1 ? 'reply' : 'replies'}
    </ViewThreadContainer>
  )
})

const ViewThreadContainer = styled.div`
  display: flex;
`
const ProfileArea = styled.div``
export default ViewThreadButton
