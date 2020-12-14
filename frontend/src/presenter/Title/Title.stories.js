import React from 'react'
import Input from './Title'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Example/Input',
  component: Input,
}

const Template = args => <Input {...args} />

export const MessageInput = Template.bind({})
MessageInput.args = {
  placeholder: 'Send a message to #example',
  handleChange: action(e => {
    console.log(e.target.value)
  }),
}
