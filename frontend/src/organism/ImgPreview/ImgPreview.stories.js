import React from 'react'
import ImgPreview from './ImgPreview'

export default {
  title: 'Organism/ImgPreview',
  component: ImgPreview,
}

const Template = args => <ImgPreview {...args} />

export const inputImgPreview = Template.bind({})
inputImgPreview.args = {
  type: 'input', // input, message
  fileId: '5fd1ed979f167053f728e7ce',
  maxSize: '300px',
}

export const messageImgPreview = Template.bind({})
messageImgPreview.args = {
  type: 'message', // input, message
  fileId: '5fd1ed979f167053f728e7ce',
  maxSize: '300px',
}
