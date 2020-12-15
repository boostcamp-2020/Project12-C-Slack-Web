import React, { useState, useEffect } from 'react'
import Input from '../../presenter/Input'
import FileUploader from '../FileUploader'
import styled from 'styled-components'
import FilePreview from '../FilePreview'
import ImgPreview from '../ImgPreview'
import { isEmpty, isImage } from '../../util/index'

function MessageEditor({ channelTitle, sendMessage }) {
  const [message, setMessage] = useState('')
  const [fileData, setFileData] = useState(null)
  const [isRender, setIsRender] = useState(false)

  useEffect(() => {
    if (fileData) setIsRender(true)
  }, [fileData])

  const handleInput = e => {
    setMessage(e.target.value)
  }
  const handleKey = e => {
    if (e.key === 'Enter' && (e.target.value || fileData)) {
      sendMessage(message, fileData)
      setMessage('')
      setFileData(null)
      setIsRender(false)
    }
  }

  const renderPreview = () => {
    return isImage(fileData?.fileType) ? (
      <ImgPreview
        type="input"
        fileId={fileData?.fileId}
        setIsRender={setIsRender}
      />
    ) : (
      <FilePreview
        type="input"
        fileId={fileData?.fileId}
        setIsRender={setIsRender}
      />
    )
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
      <div>{isRender && renderPreview()}</div>
      <div>
        <FileUploader setFileData={setFileData} />
      </div>
    </div>
  )
}

export default MessageEditor
