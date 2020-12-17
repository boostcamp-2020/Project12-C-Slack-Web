import React, { useState } from 'react'
import styled from 'styled-components'
import request from '../../util/request'
import Icon from '../../presenter/Icon'
import { CLOSE, FILE } from '../../constant/icon'
import { COLOR } from '../../constant/style'
import Button from '../../presenter/Button'
import { isImage } from '../../util'

const INPUT_MAX_IMG_WIDTH = 80
const MAX_IMG_WIDTH = 300

function FilePreview({ type, setIsRender, file, setFile }) {
  const [isHover, setIsHover] = useState(false)

  const enterMouseHandle = () => {
    setIsHover(true)
  }

  const leaveMouseHandle = () => {
    setIsHover(false)
  }

  const handleDelete = async () => {
    setIsRender(false)
    await request.DELETE('/api/file', { name: file.name })
    setFile(null)
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

  const onImgLoad = e => {
    const ratio = MAX_IMG_WIDTH / e.target.naturalWidth
    setFile({
      ...file,
      width: e.target.naturalWidth * ratio,
      height: e.target.naturalHeight * ratio,
    })
  }

  const renderImgPreview = () => {
    return (
      <StyledImgDiv
        onMouseEnter={enterMouseHandle}
        onMouseLeave={leaveMouseHandle}
      >
        {type === 'input' ? (
          <StyledImg
            alt={file?.originalName || '이미지'}
            src={file?.url}
            type={type}
            onLoad={onImgLoad}
          ></StyledImg>
        ) : (
          <StyledImg
            alt={file?.originalName || '이미지'}
            src={file?.url}
            type={type}
            width={file?.width}
            height={file?.height}
          ></StyledImg>
        )}
        {isHover &&
          (type === 'input'
            ? deleteButton()
            : type === 'message'
            ? downloadButton()
            : null)}
      </StyledImgDiv>
    )
  }

  const renderFilePreview = () => {
    return (
      <StyledFileDiv
        onMouseEnter={enterMouseHandle}
        onMouseLeave={leaveMouseHandle}
      >
        <FlexDiv>
          <Icon icon={FILE} size="24px" color={COLOR.GRAY} />
          <DescriptionDiv>
            <span>{file?.originalName}</span>
          </DescriptionDiv>
          {isHover &&
            (type === 'input'
              ? deleteButton()
              : type === 'message'
              ? downloadButton()
              : null)}
        </FlexDiv>
      </StyledFileDiv>
    )
  }

  return isImage(file?.fileType) ? renderImgPreview() : renderFilePreview()
}

const StyledImgDiv = styled.div`
  display: inline-block;
  position: relative;
  width: fit-content;
`

const StyledFileDiv = styled.div`
  display: inline-block;
  position: relative;
  border: 1px solid ${COLOR.LIGHT_GRAY};
  border-radius: 4px;
  width: fit-content;
`

const FlexDiv = styled.div`
  display: flex;
  justify-content: left;
  padding: 5px 5px 5px 10px;
`

const StyledImg = styled.img`
  max-width: ${({ type }) => {
    return type === 'input' ? `${INPUT_MAX_IMG_WIDTH}px` : `${MAX_IMG_WIDTH}px`
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
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0 4px;
`

const DescriptionDiv = styled.div`
  max-width: 200px;
  padding: 10px 15px 10px 20px;
  text-overflow: ellipsis;
  overflow: hidden;
`

export default FilePreview
