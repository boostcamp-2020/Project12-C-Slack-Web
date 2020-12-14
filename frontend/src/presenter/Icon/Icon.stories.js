import React from 'react'
import Icon from './Icon'
import { CLOSE, HASHTAG } from '../../constant/icon'

export default {
  title: 'Atom/Icon',
  component: Icon,
}

const Template = args => <Icon {...args} />

export const Lock = Template.bind({})
Lock.args = {
  icon: HASHTAG,
}

export const Close = Template.bind({})
Close.args = {
  icon: CLOSE,
  size: '4px;',
}
