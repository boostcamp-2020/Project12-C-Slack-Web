import React from 'react'
import SlackIcon from './SlackIcon'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default {
  title: 'Example/SlackIcon',
  component: SlackIcon,
}

const Template = args => <SlackIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
