import React from 'react'

import UserProfileImg from './UserProfileImg'

export default {
  title: 'Channel/UserProfileImg',
  component: UserProfileImg,
}

const Template = args => <UserProfileImg {...args} />

export const oneUserProfile = Template.bind({})
oneUserProfile.args = {
  user: {
    profileUrl: 'http://gravatar.com/avatar/0?d=identicon',
    displayName: 'directName',
    isActive: false,
  },
  size: 40,
  showActive: true,
}
export const oneHideActiveUserProfile = Template.bind({})
oneHideActiveUserProfile.args = {
  user: {
    profileUrl: 'http://gravatar.com/avatar/0?d=identicon',
    displayName: 'directName',
    isActive: false,
  },
  size: 40,
  showActive: false,
}
