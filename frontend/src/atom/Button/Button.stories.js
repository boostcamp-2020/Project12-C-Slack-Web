import React from 'react'
import Button from './Button'

export default {
  title: 'Atom/Button',
  component: Button,
}

const Template = args => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Default',
}

export const Transparent = Template.bind({})
Transparent.args = {
  children: 'Transparent',
  type: 'transparent',
}
