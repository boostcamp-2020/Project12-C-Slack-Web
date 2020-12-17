import React from 'react'
import styled from 'styled-components'
import ThreadReactionCard from '../ThreadReactionCard'
import AddReactionButton from '../../container/AddReactionButton'

function ThreadReactionList({ reactions, chatId, updateReactionHandler }) {
  const renderReactionCard = reactions.map((reaction, idx) => {
    return (
      <ThreadReactionCard
        key={idx}
        reaction={reaction}
        chatId={chatId}
        updateReactionHandler={updateReactionHandler}
      />
    )
  })

  return (
    <ThreadReactionListStyle>
      {renderReactionCard}
      <AddReactionButton
        chatId={chatId}
        updateReactionHandler={updateReactionHandler}
      />
    </ThreadReactionListStyle>
  )
}

const ThreadReactionListStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;
  cursor: pointer;
`

export default ThreadReactionList
