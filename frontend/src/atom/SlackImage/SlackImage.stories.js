import React from 'react'
import SlackImage from './SlackImage'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default {
  title: 'Example/SlackIcon',
  component: SlackImage,
}

const Template = args => <SlackImage {...args} />

export const Default = Template.bind({})
Default.args = {}
