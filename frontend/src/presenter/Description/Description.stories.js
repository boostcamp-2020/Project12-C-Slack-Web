import React from 'react'
import Description from './Description'

export default {
  title: 'Atom/Description',
  component: Description,
}

const Template = args => <Description {...args} />

export const DefaultDescription = Template.bind({})
DefaultDescription.args = {
  fontSize: '14px',
  children: 'this is description',
  marginBottom: '28px',
  marginLeft: '8px',
}
