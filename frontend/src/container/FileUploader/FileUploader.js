import React, { useRef } from 'react'
import request from '../../util/request'
import styled from 'styled-components'
import Button from '../../presenter/Button'
import Icon from '../../presenter/Icon'
import { CLIP } from '../../constant/icon'
import { toast } from 'react-toastify'
import { isEmpty } from '../../util'

const fileContentType = 'multipart/form-data'

function FileUploader({ file, setFile }) {
  const fileInput = useRef(null)

  const handleFileInput = async () => {
    if (!fileInput.current.files[0]) return
    if (fileInput.current.files[0].size > 8192000) {
      toast.error('8MB 이하의 파일만 업로드 할 수 있습니다!')
      return
    }
    if (!isEmpty(file)) {
      await request.DELETE('/api/file', { name: file.name })
      setFile(null)
    }
    await handlePost(fileInput.current.files[0])
    fileInput.current.value = null
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
      setFile(data.data)
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
        onChange={handleFileInput}
      ></StyeldInput>
    </>
  )
}

const StyeldInput = styled.input`
  width: 1px;
  height: 1px;
`

export default FileUploader
