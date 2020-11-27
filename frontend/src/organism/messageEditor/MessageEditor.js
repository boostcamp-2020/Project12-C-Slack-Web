import React, { useState } from 'react'

import Input from '../../atom/Input'

function MessageEditor({ channelTitle, sendMessage }) {
  const [message, setMessage] = useState('')
  const handleInput = e => {
    setMessage(e.target.value)
  }
  const handleKey = e => {
    if (e.key === 'Enter') {
      sendMessage(message)
      setMessage('')
    }
  }
  return (
    <div>
      <Input
        placeholder={`Send a message to #${channelTitle}`}
        handleChange={handleInput}
        handleKey={handleKey}
        value={message}
      />
      {/* TODO markdown, chat action 적용 필요 */}
    </div>
  )
}

export default MessageEditor
