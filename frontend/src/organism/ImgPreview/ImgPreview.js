import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import request from '../../util/request'
import Button from '../../atom/Button'
import Icon from '../../atom/Icon'
import { CLOSE } from '../../constant/icon'
import { COLOR } from '../../constant/style'

function ImgPreview({ type, fileId, maxSize }) {
  const [fileData, setFileData] = useState({})
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data } = await request.GET('/api/file', { fileId })
      setFileData(data.data)
    })()
  }, [fileId])

  const enterMouseHandle = () => {
    setIsHover(true)
  }

  const leaveMouseHandle = () => {
    setIsHover(false)
  }

  const handleClose = () => {
    console.log('handleClose')
  }

  const deleteButton = () => {
    return (
      <ButtonDiv
        onMouseEnter={enterMouseHandle}
        onMouseLeave={leaveMouseHandle}
      >
        <Button type="icon" handleClick={handleClose}>
          <Icon icon={CLOSE} color={COLOR.GRAY} />
        </Button>
      </ButtonDiv>
    )
  }

  const downloadButton = () => {
    return (
      <DownloadDiv
        onClick={() => {
          console.log('onClick!!!')
        }}
        onMouseEnter={enterMouseHandle}
        onMouseLeave={leaveMouseHandle}
      >
        <ClickToDownloadSpan>Click to Download</ClickToDownloadSpan>
      </DownloadDiv>
    )
  }

  return (
    <StyledDiv>
      <StyledImg
        alt={fileData.name || '이미지'}
        maxSize={maxSize}
        src={fileData.url}
        onMouseEnter={enterMouseHandle}
        onMouseLeave={leaveMouseHandle}
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
  max-width: ${({ maxSize }) => maxSize};
  height: auto;
  border-radius: 2%;
  background: white;
`

const ButtonDiv = styled.div`
  position: absolute;
  right: 5px;
  top: 0;
  background: ${COLOR.LIGHT_GRAY};
`

const DownloadDiv = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`

const ClickToDownloadSpan = styled.span`
  position: absolute;
  bottom: 5px;
  left: 10px;
  color: ${COLOR.GRAY};
`

export default ImgPreview
