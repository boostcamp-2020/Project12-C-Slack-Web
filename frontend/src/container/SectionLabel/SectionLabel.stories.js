import React from 'react'
import styled from 'styled-components'
import SectionLabel from './SectionLabel'

export default {
  title: 'Channel/SectionLabel',
  component: SectionLabel,
}

const Template = args => (
  <Background>
    <SectionLabel {...args} />
  </Background>
)

const Background = styled.div`
  background: black;
`

export const Section = Template.bind({})
Section.args = {
  sectionName: 'sectionTitle',
  lists: [
    {
      _id: '5fc4febcad44b66cf183401d',
      channelId: {
        _id: '5fc4fe66f303676bad052e9c',
        title: 'channel Title1',
        description: 'channel description2',
        topic: 'channel topic2',
        channelType: 1,
        creator: '5fc4fe427b2d5f6ae44dc15d',
        isDeleted: false,
        createdAt: '2020-11-30T14:15:03.000Z',
        updatedAt: '2020-11-30T14:15:03.000Z',
        __v: 0,
        member: [],
      },
      readChatId: '5fc4fe88c08d5a6c36a40c7a',
      isMute: false,
      notification: 0,
      sectionId: '5fc67fc8641e1d2abaffe2dd',
      createdAt: '2020-11-30T14:16:28.729Z',
      updatedAt: '2020-12-03T08:23:13.185Z',
      __v: 0,
      sectionName: null,
    },
    {
      _id: '5fc4febcad44b66cf183401d',
      channelId: {
        _id: '5fc4fe66f303676bad052e9c',
        title: 'channel Title2',
        description: 'channel description2',
        topic: 'channel topic2',
        channelType: 1,
        creator: '5fc4fe427b2d5f6ae44dc15d',
        isDeleted: false,
        createdAt: '2020-11-30T14:15:03.000Z',
        updatedAt: '2020-11-30T14:15:03.000Z',
        __v: 0,
        member: [],
      },
      readChatId: '5fc4fe88c08d5a6c36a40c7a',
      isMute: false,
      notification: 0,
      sectionId: '5fc67fc8641e1d2abaffe2dd',
      createdAt: '2020-11-30T14:16:28.729Z',
      updatedAt: '2020-12-03T08:23:13.185Z',
      __v: 0,
      sectionName: null,
    },
    {
      _id: '5fc4febcad44b66cf183401d',
      channelId: {
        _id: '5fc4fe66f303676bad052e9c',
        title: 'channel Title3',
        description: 'channel description2',
        topic: 'channel topic2',
        channelType: 1,
        creator: '5fc4fe427b2d5f6ae44dc15d',
        isDeleted: false,
        createdAt: '2020-11-30T14:15:03.000Z',
        updatedAt: '2020-11-30T14:15:03.000Z',
        __v: 0,
        member: [],
      },
      readChatId: '5fc4fe88c08d5a6c36a40c7a',
      isMute: false,
      notification: 0,
      sectionId: '5fc67fc8641e1d2abaffe2dd',
      createdAt: '2020-11-30T14:16:28.729Z',
      updatedAt: '2020-12-03T08:23:13.185Z',
      __v: 0,
      sectionName: null,
    },
  ],
  profileUrl: 'http://gravatar.com/avatar/0?d=identicon',
  displayName: 'directName',
  isActive: false,
}
