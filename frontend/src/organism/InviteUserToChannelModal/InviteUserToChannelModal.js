import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { currentChannelInfo, workspaceUserInfoAtom } from '../../store'

import Button from '../../atom/Button'
import Icon from '../../atom/Icon'
import { LOCK, HASHTAG, CLOSE } from '../../constant/icon'
import { debounce } from '../../util'
import request from '../../util/request'
import Modal from '../../atom/Modal'

function InviteUserToChannelModal({ handleClose }) {
  const channelInfo = useRecoilValue(currentChannelInfo)
  const workspaceUserInfo = useRecoilValue(workspaceUserInfoAtom)
  const [keyword, setKeyword] = useState('')
  const [inviteUserList, setInviteUserList] = useState([])

  const SearchUser = async () => {
    const { data } = await request.POST('/api/search/user', {
      keyword: keyword,
      channelId: channelInfo.channelId._id,
      workspaceId: workspaceUserInfo.workspaceId,
    })
    console.log(data.result)
  }

  const handleDebounce = useRef(debounce(SearchUser, 1000)).current
  const handleChange = (setter, debounce) => e => {
    setter(e.target.value)
    if (debounce) debounce()
  }

  return Object.keys(channelInfo).length !== 0 ? (
    <Modal handleClose={handleClose}>
      <ModalForm>
        <Header>
          <TitleArea>
            <Title>Add people</Title>
            <SubTitle>
              <Icon
                icon={channelInfo.channelId.channelType ? HASHTAG : LOCK}
                size="13px"
              />
              &nbsp;
              {channelInfo.channelId.title}
            </SubTitle>
          </TitleArea>
          <CloseIcon onClick={handleClose}>
            <Icon icon={CLOSE} size="13px" />
          </CloseIcon>
        </Header>
        <ContentsArea>
          <SearchArea>
            <SearchUserInput
              onChange={handleChange(setKeyword, handleDebounce)}
              placeholder="Search by name, email, or user group"
            />
          </SearchArea>
          <ButtonArea>
            <Button children="Done" disabled={inviteUserList.length === 0} />
          </ButtonArea>
        </ContentsArea>
      </ModalForm>
    </Modal>
  ) : (
    <div>asd</div>
  )
}

const ModalForm = styled.div`
  width: auto;
  height: 200px;
  padding: 20px 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
`

const SubTitle = styled.div`
  margin: 5px 0;
  display: flex;
  align-items: center;
`

const CloseIcon = styled.div`
  cursor: pointer;
`

const ContentsArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SearchArea = styled.div`
  width: 100%;
  min-height: 30px;
  margin: 30px 0;
  font-size: 15px;
  border: 1px solid black;
  border-radius: 3px;
`

const SearchUserInput = styled.input`
  width: 100%;
  height: 30px;
  margin: 0;
  padding: 0;
  font-size: 15px;
  border: 0;

  &:focus-within {
    outline: none;
  }
`

const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export default InviteUserToChannelModal
