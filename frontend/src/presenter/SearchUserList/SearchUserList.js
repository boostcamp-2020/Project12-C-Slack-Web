import React from 'react'
import styled from 'styled-components'
import SearchUserCard from '../../container/SearchUserCard'
import { COLOR } from '../../constant/style'

function SearchUserList({ searchResult, state, setState }) {
  const renderResult =
    searchResult.length !== 0 ? (
      searchResult.map((info, idx) => {
        return (
          <SearchUserCard
            key={idx}
            userInfo={info}
            state={state}
            setState={setState}
          />
        )
      })
    ) : (
      <NoResultArea>No result</NoResultArea>
    )

  return <SearchUserListArea>{renderResult}</SearchUserListArea>
}
const SearchUserListArea = styled.div`
  position: absolute;
  width: 100%;
  max-height: 200px;
  background: ${COLOR.BACKGROUNT_MODAL_GRAY};
  border: 1px solid ${COLOR.BACKGROUNT_MODAL_GRAY};
  border-radius: 10px;
  overflow: hidden;
`

const NoResultArea = styled.div`
  width: 100%;
  height: 50px;
  font-size: 17px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export default SearchUserList
