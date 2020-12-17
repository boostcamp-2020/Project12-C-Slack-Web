import React from 'react'
import FilePreview from './FilePreview'

export default {
  title: 'Organism/FilePreview',
  component: FilePreview,
}
let isRender = true
const Template = args => <>{isRender && <FilePreview {...args} />}</>

export const inputImgPreview = Template.bind({})
inputImgPreview.args = {
  type: 'input', // input, message
  file: {
    fileId: '5fda2fe2e882860557e592fd',
    name: 'file-1608140339770-슬기.jpg',
    originalName: '슬기.jpg',
    fileType: 'image/jpeg',
    creator: '5fd81c4d630674160961baf4',
    url:
      'https://kr.object.ncloudstorage.com/slack-clone-files/file-1608140339770-슬기.jpg',
  },
  setFile: () => {},
  setIsRender: () => {
    isRender = false
  },
}

export const messageImgPreview = Template.bind({})
messageImgPreview.args = {
  type: 'message', // input, message
  file: {
    fileId: '5fda2fe2e882860557e592fd',
    name: 'file-1608140339770-슬기.jpg',
    originalName: '슬기.jpg',
    fileType: 'image/jpeg',
    creator: '5fd81c4d630674160961baf4',
    url:
      'https://kr.object.ncloudstorage.com/slack-clone-files/file-1608140339770-슬기.jpg',
    width: '700px',
    height: '500px',
  },
}

export const inputFilePreview = Template.bind({})
inputFilePreview.args = {
  type: 'input', // input, message
  file: {
    fileId: '5fda2fe2e882860557e592fd',
    name: 'file-1608140450582-test.zip',
    originalName: 'test.zip',
    fileType: 'application/x-zip-compressed',
    creator: '5fd81c4d630674160961baf4',
    url:
      'https://kr.object.ncloudstorage.com/slack-clone-files/file-1608140450582-test.zip',
  },
  setIsRender: () => {
    isRender = false
  },
}

export const messageFilePreview = Template.bind({})
messageFilePreview.args = {
  type: 'message', // input, message
  file: {
    fileId: '5fda2fe2e882860557e592fd',
    name: 'file-1608140450582-test.zip',
    originalName: 'test.zip',
    fileType: 'application/x-zip-compressed',
    creator: '5fd81c4d630674160961baf4',
    url:
      'https://kr.object.ncloudstorage.com/slack-clone-files/file-1608140450582-test.zip',
  },
}
