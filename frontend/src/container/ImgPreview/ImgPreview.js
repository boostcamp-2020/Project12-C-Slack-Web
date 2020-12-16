import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import request from '../../util/request'
import Icon from '../../presenter/Icon'
import { CLOSE } from '../../constant/icon'
import { COLOR } from '../../constant/style'
import Button from '../../presenter/Button'

function ImgPreview({ type, setIsRender, file }) {
  const [isHover, setIsHover] = useState(false)

  const enterMouseHandle = () => {
    setIsHover(true)
  }

  const leaveMouseHandle = () => {
    setIsHover(false)
  }

  const handleDelete = async () => {
    setIsRender(false)
    await request.DELETE('/api/file', { fileId: file.fileId })
  }

  const deleteButton = () => {
    return (
      <ButtonDiv>
        <Button type="icon" handleClick={handleDelete} size="small">
          <Icon icon={CLOSE} size="8px" color={COLOR.GRAY} />
        </Button>
      </ButtonDiv>
    )
  }

  const downloadButton = () => {
    return (
      <DownloadDiv
        onClick={() => {
          if (file) window.open(file.url, '_blank')
        }}
      >
        <ClickToDownloadSpan>Click to Download</ClickToDownloadSpan>
      </DownloadDiv>
    )
  }

  return (
    <StyledDiv onMouseEnter={enterMouseHandle} onMouseLeave={leaveMouseHandle}>
      <StyledImg
        alt={file?.name || '이미지'}
        src={file?.url}
        type={type}
      ></StyledImg>
      {isHover &&
        (type === 'input'
          ? deleteButton()
          : type === 'message'
          ? downloadButton()
          : null)}
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: inline-block;
  position: relative;
`

const StyledImg = styled.img`
  max-width: ${({ type }) => {
    return type === 'input' ? '80px' : '300px'
  }};
  height: auto;
  border-radius: 2%;
  background: white;
`

const ButtonDiv = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  background: white;
  width: -webkit-fit-content;
  height: -webkit-fit-content;
  box-sizing: border-box;
`

const DownloadDiv = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const ClickToDownloadSpan = styled.span`
  position: absolute;
  bottom: 5px;
  left: 10px;
  color: ${COLOR.GRAY};
`

export default ImgPreview
