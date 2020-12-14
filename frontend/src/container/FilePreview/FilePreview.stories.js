import React from 'react'
import FilePreview from './FilePreview'

export default {
  title: 'Organism/FilePreview',
  component: FilePreview,
}
let isRender = true
const Template = args => <>{isRender && <FilePreview {...args} />}</>

export const inputFilePreview = Template.bind({})
inputFilePreview.args = {
  type: 'input', // input, message
  fileId: '5fd6ea342d026a63752cd31b',
  setIsRender: () => {
    isRender = false
  },
}

export const messageFilePreview = Template.bind({})
messageFilePreview.args = {
  type: 'message', // input, message
  fileId: '5fd6ea342d026a63752cd31b',
}
