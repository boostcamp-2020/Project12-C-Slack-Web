import React from 'react'

import DirectMessageCard from './DirectMessageCard'

export default {
  title: 'Channel/DirectMessageCard',
  component: DirectMessageCard,
}

const Template = args => <DirectMessageCard {...args} />

export const oneActiveDirectMessageLabel = Template.bind({})
oneActiveDirectMessageLabel.args = {
  directMessage: {
    member: [
      {
        profileUrl: 'http://gravatar.com/avatar/0?d=identicon',
        displayName: 'directName',
        isActive: false,
      },
    ],
  },
}
export const oneInactiveDirectMessageLabel = Template.bind({})
oneInactiveDirectMessageLabel.args = {
  directMessage: {
    member: [
      {
        profileUrl: 'http://gravatar.com/avatar/0?d=identicon',
        displayName: 'directName',
        isActive: true,
      },
    ],
  },
}
export const multiDirectMessageLabel = Template.bind({})
multiDirectMessageLabel.args = {
  directMessage: {
    member: [
      {
        profileUrl: 'http://gravatar.com/avatar/0?d=identicon',
        displayName: 'directName',
      },
      {
        profileUrl: 'http://gravatar.com/avatar/0?d=identicon',
        displayName: 'directName1',
      },
      {
        profileUrl: 'http://gravatar.com/avatar/0?d=identicon',
        displayName: 'directName2',
      },
    ],
  },
}
