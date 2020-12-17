import React, { useState } from 'react'
import styled from 'styled-components'

import { COLOR } from '../../constant/style'
import Input from '../../presenter/Input'
function MessageEditor({ sendMessage, placeholder }) {
  const [message, setMessage] = useState('')
  const handleInput = e => {
    setMessage(e.target.value)
  }
  const handleKey = e => {
    if (e.key === 'Enter' && e.target.value) {
      sendMessage(message)
      setMessage('')
    }
  }
  return (
    <MessageEditorContainer>
      <Input
        placeholder={placeholder}
        handleChange={handleInput}
        handleKey={handleKey}
        value={message}
      />
      {/* TODO markdown, chat action 적용 필요 */}
    </MessageEditorContainer>
  )
}
const MessageEditorContainer = styled.div`
  padding: 20px;
  background-color: ${COLOR.WHITE};
`
export default MessageEditor
