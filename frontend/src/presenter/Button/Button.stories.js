import React from 'react'
import Button from './Button'
import Icon from '../Icon'
import { CLOSE } from '../../constant/icon'
import { COLOR } from '../../constant/style'

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

export const SmallIcon = Template.bind({})
SmallIcon.args = {
  children: <Icon icon={CLOSE} size="8px" color={COLOR.GRAY} />,
  type: 'icon',
  size: 'small',
}
