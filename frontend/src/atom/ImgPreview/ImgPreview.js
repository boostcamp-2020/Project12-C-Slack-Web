import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import request from '../../util/request'

function ImgPreview({ type, fileId, maxSize }) {
  const [fileData, setFileData] = useState({})

  useEffect(() => {
    ;(async () => {
      const { data } = await request.GET('/api/file', { fileId })
      setFileData(data.data)
    })()
  }, [fileId])

  return (
    <StyledImg
      alt={fileData.name || '이미지'}
      maxSize={maxSize}
      src={fileData.url}
    />
  )
}

const StyledImg = styled.img`
  max-width: ${({ maxSize }) => maxSize};
  height: auto;
  border-radius: 2%;
`
export default ImgPreview
