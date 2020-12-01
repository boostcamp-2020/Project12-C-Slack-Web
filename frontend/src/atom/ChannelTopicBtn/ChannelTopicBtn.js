import React from 'react'
import styled from 'styled-components'

function ChannelTopicBtn(props) {
  const topic = props.topic

  return topic === null || topic === '' ? (
    <AddTopicBtn>Add a Topic</AddTopicBtn>
  ) : (
    <div>{props.topic}</div>
  )
}

const AddTopicBtn = styled.div`
  &:hover {
    color: #1264a3;
  }
`

export default ChannelTopicBtn
