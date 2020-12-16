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
  setIsRender: () => {
    isRender = false
  },
  file: {
    fileId: '5fda2f97e882860557e592fc',
    fileName: '5주 그룹프로젝트 4주차 데모 및 피어세션 그룹 안내.pdf',
    fileType: 'application/pdf',
    creator: '5fd81c4d630674160961baf4',
  },
}

export const messageFilePreview = Template.bind({})
messageFilePreview.args = {
  type: 'message', // input, message
  file: {
    fileId: '5fda2f97e882860557e592fc',
    fileName: '5주 그룹프로젝트 4주차 데모 및 피어세션 그룹 안내.pdf',
    fileType: 'application/pdf',
    creator: '5fd81c4d630674160961baf4',
  },
}
