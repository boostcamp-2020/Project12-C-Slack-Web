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
      title: 'channel Title1',
      description: 'channel description1',
      topic: 'channel topic1',
      channelType: 1,
      creator: '5fc4fe427b2d5f6ae44dc15e',
      isDeleted: true,
      createdAt: '2020-11-30T14:15:03.000Z',
      updatedAt: '2020-11-30T14:15:03.000Z',
    },
    {
      title: 'channel Title1',
      description: 'channel description1',
      topic: 'channel topic1',
      channelType: 1,
      creator: '5fc4fe427b2d5f6ae44dc15e',
      isDeleted: true,
      createdAt: '2020-11-30T14:15:03.000Z',
      updatedAt: '2020-11-30T14:15:03.000Z',
    },
    {
      title: 'channel Title1',
      description: 'channel description1',
      topic: 'channel topic1',
      channelType: 1,
      creator: '5fc4fe427b2d5f6ae44dc15e',
      isDeleted: true,
      createdAt: '2020-11-30T14:15:03.000Z',
      updatedAt: '2020-11-30T14:15:03.000Z',
    },
  ],
  profileUrl: 'http://gravatar.com/avatar/0?d=identicon',
  displayName: 'directName',
  isActive: false,
}
