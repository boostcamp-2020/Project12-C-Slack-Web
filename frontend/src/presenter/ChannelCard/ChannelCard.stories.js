import React from 'react'

import ChannelCard from './ChannelCard'

export default {
  title: 'Channel/ChannelCard',
  component: ChannelCard,
}

const Template = args => <ChannelCard {...args} />

export const PublicChannelCard = Template.bind({})
PublicChannelCard.args = {
  color: 'black',
  channel: { title: 'TitleName', channelType: 0 },
  displayName: 'test',
}
export const PrivateChannelCard = Template.bind({})
PrivateChannelCard.args = {
  color: 'black',
  channel: { title: 'TitleName', channelType: 1 },
}
