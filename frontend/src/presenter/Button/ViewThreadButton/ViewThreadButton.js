import React, { memo } from 'react'
import UserProfileImg from '../../UserProfileImg'
import { go, Lazy, take } from '../../../util/fx'
const MAX_NUMBER_OF_PROFILES = 5
const SMALL_SIZE = 24
const ViewThreadButton = memo(({ reply }) => {
  console.log(reply)
  const removeDuplicateValues = profileList => [...new Set(profileList)]
  const mapToComponent = (item, index) => (
    <UserProfileImg key={index} user={{ profileUrl: item }} size={SMALL_SIZE} />
  )
  return (
    <div>
      {go(
        reply,
        Lazy.map(item => item?.userInfo?.profileUrl),
        removeDuplicateValues,
        take(MAX_NUMBER_OF_PROFILES),
        mapToComponent,
      )}
      {reply.length} {reply.length === 1 ? 'reply' : 'replies'}
    </div>
  )
})

export default ViewThreadButton
