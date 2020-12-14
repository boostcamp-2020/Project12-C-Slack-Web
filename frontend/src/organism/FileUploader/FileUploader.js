import React, { useState } from 'react'
import request from '../../util/request'

const fileContentType = 'multipart/form-data'

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState()

  const handleFileInput = e => {
    setSelectedFile(e.target.files[0])
  }
  const handlePost = async () => {
    const formData = new FormData()
    formData.append('file', selectedFile)
    await request.POST('/api/file', formData, fileContentType)
  }

  return (
    <>
      <input
        type="file"
        name="fileData"
        onChange={e => handleFileInput(e)}
      ></input>
      <button onClick={handlePost}>전송</button>
    </>
  )
}

export default FileUploader
