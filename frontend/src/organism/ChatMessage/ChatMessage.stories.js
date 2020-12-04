import React from 'react'
import ChatMessage from './ChatMessage'

export default {
  title: 'Organism/ChatMessage',
  component: ChatMessage,
}

const Template = args => <ChatMessage {...args} />

export const Default = Template.bind({})
Default.args = {
  _id: '5fc4fe88c08d5a6c36a40c76',
  pinned: false,
  contents: 'chat contents0',
  channel: '5fc4fe66f303676bad052e9e',
  creator: '5fc4fe427b2d5f6ae44dc15d',
  parentId: null,
  isDelete: false,
  createdAt: '2020-11-30T14:15:36.913Z',
  updatedAt: '2020-11-30T14:15:36.913Z',
  __v: 0,
  reply: [
    {
      _id: '5fc8a4e163e2bbce1b8569de',
      creator: '5fc4fe427b2d5f6ae44dc15d',
      createdAt: '2020-12-02T15:00:00.000Z',
      userInfo: {
        _id: '5fc4fe427b2d5f6ae44dc15d',
        displayName: 'workdisplayName0',
        profileUrl: 'http://gravatar.com/avatar/0?d=identicon',
      },
    },
  ],
  userInfo: {
    _id: '5fc4fe427b2d5f6ae44dc15d',
    displayName: '김종원',
    profileUrl: 'http://gravatar.com/avatar/0?d=identicon',
  },
}
