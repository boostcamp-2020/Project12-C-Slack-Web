import React from 'react'
import ImgPreview from './ImgPreview'

export default {
  title: 'Atom/ImgPreview',
  component: ImgPreview,
}

const Template = args => <ImgPreview {...args} />

export const defaultImgPreview = Template.bind({})
defaultImgPreview.args = {
  fileId: '5fd1bbbadc9599329916ef90',
  maxSize: '300px',
}
