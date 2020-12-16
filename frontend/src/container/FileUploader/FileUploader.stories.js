import React, { useState, useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import FileUploader from './FileUploader'
import styled from 'styled-components'
import FilePreview from '../FilePreview'
import ImgPreview from '../ImgPreview'
import { isImage } from '../../util/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const stories = storiesOf('Organism', module)

const TestComponent = () => {
  const [fileData, setFileData] = useState(null)
  const [isRender, setIsRender] = useState(false)

  useEffect(() => {
    if (fileData) setIsRender(true)
  }, [fileData])

  const renderPreview = () => {
    return isImage(fileData?.fileType) ? (
      <ImgPreview
        type="input"
        fileId={fileData?.fileId}
        file={fileData}
        setIsRender={setIsRender}
      />
    ) : (
      <FilePreview
        type="input"
        fileId={fileData?.fileId}
        file={fileData}
        setIsRender={setIsRender}
      />
    )
  }

  return (
    <>
      <ToastContainer />
      <StyledDiv>{isRender && renderPreview()}</StyledDiv>
      <FileUploader fileData={fileData} setFileData={setFileData} />
    </>
  )
}
stories.add('FileUploader', () => <TestComponent />)

const StyledDiv = styled.div`
  min-width: 300px;
  min-height: 200px;
  background: gray;
`
