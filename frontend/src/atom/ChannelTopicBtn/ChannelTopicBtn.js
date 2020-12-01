import React from 'react'
import styled from 'styled-components'

function ChannelTopicBtn(props) {
  const topic = props.topic

  return topic === null || topic === '' ? (
    <AddTopicBtn>Add a Topic</AddTopicBtn>
  ) : (
    <TopicArea>
      <Topic>{props.topic}</Topic>
      <EditBtn>Edit</EditBtn>
    </TopicArea>
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
  &:hover {
    border: 1px solid gray;
  }
`

const EditBtn = styled.div`
  display: none;
  color: blue;
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
  }
`

export default ChannelTopicBtn
