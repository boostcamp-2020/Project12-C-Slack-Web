import React from 'react'
import styled from 'styled-components'
import SelectedUserCard from '../SelectedUserCard'

function SelectedUserList({ inviteUserList, setInviteUserList }) {
  const renderSelectedUserList =
    inviteUserList.length !== 0 ? (
      inviteUserList.map((userInfo, idx) => {
        return (
          <SelectedUserCard
            key={idx}
            userInfo={userInfo}
            inviteUserList={inviteUserList}
            setInviteUserList={setInviteUserList}
          />
        )
      })
    ) : (
      <div></div>
    )

  return <SelectedUserListStyle>{renderSelectedUserList}</SelectedUserListStyle>
}

const SelectedUserListStyle = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default SelectedUserList
