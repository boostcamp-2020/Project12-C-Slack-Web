import React from 'react'
import SmallButton from './SmallButton'
import Icon from '../../Icon'
import { CLOSE } from '../../../constant/icon'
import { COLOR } from '../../../constant/style'

export default {
  title: 'Atom/SmallButton',
  component: SmallButton,
}

const Template = args => <SmallButton {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Default',
}

export const IconButton = Template.bind({})
IconButton.args = {
  children: <Icon icon={CLOSE} size="8px" color={COLOR.GRAY} />,
  type: 'icon',
}
