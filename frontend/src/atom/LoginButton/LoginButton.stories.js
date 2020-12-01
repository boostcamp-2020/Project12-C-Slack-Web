import React from 'react'
import Button from './LoginButton'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default {
  title: 'Example/LoginButton',
  component: Button,
}

const Template = args => <Button {...args} />

export const LoginButton = Template.bind({})
LoginButton.args = {
  label: 'Login With github',
  icon: <FontAwesomeIcon icon={faGithub} size="2x" />,
}
