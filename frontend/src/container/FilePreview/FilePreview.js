import React, { useState } from 'react'
import styled from 'styled-components'
import request from '../../util/request'
import Icon from '../../presenter/Icon'
import { CLOSE, FILE } from '../../constant/icon'
import { COLOR } from '../../constant/style'
import Button from '../../presenter/Button/Button'

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
    await request.DELETE('/api/file', { name: file?.name })
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
          if (file) window.open(file?.url, '_blank')
        }}
      >
        <ClickToDownloadSpan>Click to Download</ClickToDownloadSpan>
      </DownloadDiv>
    )
  }
  return (
    <StyledDiv onMouseEnter={enterMouseHandle} onMouseLeave={leaveMouseHandle}>
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
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: inline-block;
  position: relative;
  border: 1px solid ${COLOR.LIGHT_GRAY};
  border-radius: 4px;
  min-width: 200px;
`

const FlexDiv = styled.div`
  display: flex;
  justify-content: left;
  padding: 5px 5px 5px 10px;
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
  bottom: 0px;
  font-size: 12px;
  color: ${COLOR.GRAY};
`

const DescriptionDiv = styled.div`
  padding: 10px 15px 10px 20px;
`

export default FilePreview
