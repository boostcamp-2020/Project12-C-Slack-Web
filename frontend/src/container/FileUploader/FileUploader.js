import React, { useRef } from 'react'
import request from '../../util/request'
import styled from 'styled-components'
import Button from '../../presenter/Button'
import Icon from '../../presenter/Icon'
import { CLIP } from '../../constant/icon'
import { toast } from 'react-toastify'

const fileContentType = 'multipart/form-data'

function FileUploader({ fileData, setFileData }) {
  const fileInput = useRef(null)
  const handleFileInput = async e => {
    if (!e.target.files[0]) return
    if (e.target.files[0].size > 8192000) {
      toast.error('8MB 이하의 파일만 업로드 할 수 있습니다!')
      return
    }
    if (fileData !== null) {
      await request.DELETE('/api/file', { fileId: fileData.fileId })
    }
    await handlePost(e.target.files[0])
  }
  const handlePost = async selectedFile => {
    if (selectedFile) {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const { data } = await request.POST(
        '/api/file',
        formData,
        fileContentType,
      )
      setFileData(data.data)
    }
  }

  return (
    <>
      <Button type="icon" handleClick={() => fileInput.current.click()}>
        <Icon icon={CLIP} />
      </Button>
      <StyeldInput
        type="file"
        name="fileData"
        ref={fileInput}
        onChange={e => handleFileInput(e)}
      ></StyeldInput>
    </>
  )
}

const StyeldInput = styled.input`
  width: 1px;
  height: 1px;
`

export default FileUploader
