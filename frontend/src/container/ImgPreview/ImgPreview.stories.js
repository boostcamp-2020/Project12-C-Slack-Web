import React from 'react'
import ImgPreview from './ImgPreview'

export default {
  title: 'Organism/ImgPreview',
  component: ImgPreview,
}
let isRender = true
const Template = args => <>{isRender && <ImgPreview {...args} />}</>

export const inputImgPreview = Template.bind({})
inputImgPreview.args = {
  type: 'input', // input, message
  fileId: '5fd5dc7d8c8a82245fa0ab38',
  setIsRender: () => {
    isRender = false
  },
}

export const messageImgPreview = Template.bind({})
messageImgPreview.args = {
  type: 'message', // input, message
  fileId: '5fd5dc7d8c8a82245fa0ab38',
}
