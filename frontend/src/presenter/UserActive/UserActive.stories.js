import React from 'react'

import UserActive from './UserActive'

export default {
  title: 'Channel/UserActive',
  component: UserActive,
}

const Template = args => <UserActive {...args} />

export const ActiveUser = Template.bind({})
ActiveUser.args = {
  isActive: true,
}
export const InactiveUser = Template.bind({})
InactiveUser.args = {
  isActive: false,
}
