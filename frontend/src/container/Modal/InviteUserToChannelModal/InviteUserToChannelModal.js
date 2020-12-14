import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { modalRecoil, socketRecoil } from '../../../store'
import { useParams } from 'react-router-dom'
import Button from '../../../presenter/Button'
import Icon from '../../../presenter/Icon'
import { LOCK, HASHTAG, CLOSE } from '../../../constant/icon'
import { debounce } from '../../../util'
import request from '../../../util/request'
import Modal from '../../../presenter/Modal'
import SearchUserList from '../../../presenter/SearchUserList'
import SelectedUserList from '../../../presenter/SelectedUserList'
import useChannelInfo from '../../../hooks/useChannelInfo'

function InviteUserToChannelModal({ handleClose }) {
  const [channelInfo] = useChannelInfo()
  const setModal = useSetRecoilState(modalRecoil)
  const socket = useRecoilValue(socketRecoil)
  const [searchResult, setSearchResult] = useState(null)
  const [inviteUserList, setInviteUserList] = useState([])
  const { workspaceId } = useParams()

  const SearchUser = async search => {
    if (search.length === 0) return setSearchResult(null)
    const { data } = await request.POST('/api/search/user', {
      keyword: search,
      channelId: channelInfo.channelId._id,
      workspaceId,
    })
    setSearchResult(data.result)
  }

  const inviteUser = async () => {
    if (!inviteUserList.length) return
    const { data } = await request.POST('/api/channel/invite', {
      channelId: channelInfo.channelId._id,
      workspaceUserInfoId: inviteUserList.map(user => user._id),
    })

    if (data.success) {
      socket.emit('invite channel', {
        channelId: channelInfo.channelId._id,
        origin: channelInfo.member.map(user => user._id),
        newMember: inviteUserList.map(user => user._id),
      })
      setModal(null)
    }
  }

  const handleDebounce = useRef(debounce(SearchUser, 1000)).current

  const handleChange = e => {
    handleDebounce(e.target.value)
  }

  return (
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
          <InviteUserListArea>
            <SelectedUserList
              inviteUserList={inviteUserList}
              setInviteUserList={setInviteUserList}
            />
          </InviteUserListArea>
          <SearchResultArea>
            <SearchArea>
              <SearchUserInput
                onChange={e => handleChange(e)}
                placeholder="Search by name, email, or user group"
              />
            </SearchArea>
            {searchResult !== null && (
              <SearchUserList
                searchResult={searchResult}
                state={inviteUserList}
                setState={setInviteUserList}
              />
            )}
          </SearchResultArea>
          <ButtonArea>
            <Button
              children="Done"
              handleClick={inviteUser}
              disabled={inviteUserList.length === 0}
            />
          </ButtonArea>
        </ContentsArea>
      </ModalForm>
    </Modal>
  )
}

const ModalForm = styled.div`
  width: auto;
  min-height: 200px;
  border-radius: 8px;
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

const InviteUserListArea = styled.div`
  width: 100%;
`

const SearchResultArea = styled.div`
  position: relative;
  width: 100%;
  min-height: 30px;
  margin: 30px 0;
  font-size: 15px;
`

const SearchArea = styled.div`
  width: 100%;
  min-height: 30px;
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
