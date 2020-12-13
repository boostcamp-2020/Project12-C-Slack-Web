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
  fileId: '5fd5e4018c8a82245fa0ab39',
  setIsRender: () => {
    isRender = false
  },
}

export const messageFilePreview = Template.bind({})
messageFilePreview.args = {
  type: 'message', // input, message
  fileId: '5fd5e4018c8a82245fa0ab39',
}
