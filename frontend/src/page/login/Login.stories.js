import React from 'react'
import LoginPage from './Login'

export default {
  title: 'Example/Login',
  component: LoginPage,
}

const Template = args => <LoginPage {...args} />

export const Login = Template.bind({})
Login.args = {}
