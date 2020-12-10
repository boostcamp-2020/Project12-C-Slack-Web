import React from 'react'
import Input from './Input'
import { action } from '@storybook/addon-actions'
import Icon from '../Icon'
import { HASHTAG } from '../../constant/icon'
export default {
  title: 'Atom/Input',
  component: Input,
}

const Template = args => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Send a message to #example',
  value: 'text',
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  placeholder: 'Send a message to #example',
  value: 'text',
  children: <Icon icon={HASHTAG} />,
  maxLength: 80,
}
