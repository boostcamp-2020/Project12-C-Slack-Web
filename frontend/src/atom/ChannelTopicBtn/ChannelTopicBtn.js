import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constant/style'

function ChannelTopicBtn({ topic }) {
  return topic ? (
    <TopicArea>
      <Topic>{topic}</Topic>
      <EditBtn color={COLOR.STARBLUE}>Edit</EditBtn>
    </TopicArea>
  ) : (
    <AddTopicBtn>Add a Topic</AddTopicBtn>
  )
}

const AddTopicBtn = styled.div`
  &:hover {
    color: #1264a3;
  }
`

const Topic = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 3px;
  border-radius: 4px;
  border: 1px solid transparent;
`

const EditBtn = styled.div`
  display: none;
  color: ${props => props.color};
  margin-left: 5px;
  border: 1px solid transparent;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const TopicArea = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2px 1px;

  &:hover {
    ${EditBtn} {
      display: flex;
    }
    ${Topic} {
      border: 1px solid ${COLOR.LABEL_SELECT_SUB_TEXT};
    }
  }
`

export default ChannelTopicBtn
