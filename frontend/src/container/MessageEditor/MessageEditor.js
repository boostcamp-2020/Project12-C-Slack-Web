import React, { useState, useEffect } from 'react'
import { COLOR } from '../../constant/style'
import Input from '../../presenter/Input'
import FileUploader from '../FileUploader'
import FilePreview from '../FilePreview'
import styled from 'styled-components'

function MessageEditor({ sendMessage, placeholder }) {
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const [isRender, setIsRender] = useState(false)

  useEffect(() => {
    if (file) setIsRender(true)
  }, [file])

  const handleInput = e => {
    setMessage(e.target.value)
  }
  const handleKey = e => {
    if (e.key === 'Enter' && (e.target.value || file)) {
      sendMessage(message, file)
      setMessage('')
      setFile(null)
      setIsRender(false)
    }
  }

  const renderPreview = () => {
    return (
      <FilePreview
        type="input"
        file={file}
        setFile={setFile}
        setIsRender={setIsRender}
      />
    )
  }

  return (
    <MessageEditorContainer>
      <Input
        placeholder={placeholder}
        handleChange={handleInput}
        handleKey={handleKey}
        value={message}
      />
      <div>{isRender && renderPreview()}</div>
      <div>
        <FileUploader file={file} setFile={setFile} />
      </div>
      {/* TODO markdown, chat action 적용 필요 */}
    </MessageEditorContainer>
  )
}
const MessageEditorContainer = styled.div`
  padding: 20px;
  background-color: ${COLOR.WHITE};
`
export default MessageEditor
