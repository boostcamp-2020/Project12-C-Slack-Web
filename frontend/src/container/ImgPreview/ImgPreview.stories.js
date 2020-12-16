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
  file: {
    fileId: '5fda2fe2e882860557e592fd',
    fileName: '죠르디.jpg',
    fileType: 'image/jpeg',
    creator: '5fd81c4d630674160961baf4',
  },
  setIsRender: () => {
    isRender = false
  },
}

export const messageImgPreview = Template.bind({})
messageImgPreview.args = {
  type: 'message', // input, message
  file: {
    fileId: '5fda2fe2e882860557e592fd',
    fileName: '죠르디.jpg',
    fileType: 'image/jpeg',
    creator: '5fd81c4d630674160961baf4',
  },
}
