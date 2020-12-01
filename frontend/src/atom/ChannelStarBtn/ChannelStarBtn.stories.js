import React from 'react'

import ChannelStarBtn from './ChannelStarBtn'

export default {
  title: 'Channel/ChannelStarBtn',
  component: ChannelStarBtn,
}

const Template = args => <ChannelStarBtn {...args} />

export const hasSection = Template.bind({})
hasSection.args = {
  section: { name: 'sectionName' },
}
export const nullsection = Template.bind({})
nullsection.args = {
  section: { name: null },
}
