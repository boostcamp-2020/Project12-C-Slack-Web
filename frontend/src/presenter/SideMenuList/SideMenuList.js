import React from 'react'
import styled from 'styled-components'
import SideMenuCard from '../SideMenuCard'
import {
  COMMENTDOTS,
  COMMENTS,
  ELLIPSISV,
  AT,
  BOOKMARK,
} from '../../constant/icon'

function SideMenuList() {
  return (
    <SideMenuListStyle>
      <SideMenuCard icon={COMMENTDOTS} color="" linkUrl="threads">
        Threads
      </SideMenuCard>
      <SideMenuCard icon={COMMENTS} color="" linkUrl="all-dms">
        All DMs
      </SideMenuCard>
      <SideMenuCard icon={AT} color="" linkUrl="activity-page">
        Mentions & reactions
      </SideMenuCard>
      <SideMenuCard icon={BOOKMARK} color="" linkUrl="saved-page" type="more">
        Saved items
      </SideMenuCard>
      <SideMenuCard icon={ELLIPSISV} color="" linkUrl="more" type="more">
        More
      </SideMenuCard>
    </SideMenuListStyle>
  )
}

const SideMenuListStyle = styled.div`
  width: 100%;
  padding: 6px 0;
`

export default SideMenuList
