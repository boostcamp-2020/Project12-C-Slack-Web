import React, { useState, useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import FileUploader from './FileUploader'
import styled from 'styled-components'
import FilePreview from '../FilePreview'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const stories = storiesOf('Organism', module)

const TestComponent = () => {
  const [file, setFile] = useState(null)
  const [isRender, setIsRender] = useState(false)

  useEffect(() => {
    if (file) setIsRender(true)
  }, [file])

  const renderPreview = () => {
    return (
      <FilePreview
        type="input"
        fileId={file?.fileId}
        file={file}
        setFile={setFile}
        setIsRender={setIsRender}
      />
    )
  }

  return (
    <>
      <ToastContainer />
      <StyledDiv>{isRender && renderPreview()}</StyledDiv>
      <FileUploader file={file} setFile={setFile} />
    </>
  )
}
stories.add('FileUploader', () => <TestComponent />)

const StyledDiv = styled.div`
  min-width: 300px;
  min-height: 200px;
  background: gray;
`
