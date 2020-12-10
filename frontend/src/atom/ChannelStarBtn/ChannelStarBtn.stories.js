import React from 'react'

import ChannelStarBtn from './ChannelStarBtn'
import { MemoryRouter, Route } from 'react-router-dom'

export default {
  title: 'Channel/ChannelStarBtn',
  component: ChannelStarBtn,
}
const Template = args => (
  <MemoryRouter
    initialEntries={[
      'workspace/5fc4fe2faa1ecd6a71dde1a8/5fc4fe66f303676bad052ea0',
    ]}
  >
    <Route path="workspace/:workspaceId/:channelId">
      <ChannelStarBtn {...args} />
    </Route>
  </MemoryRouter>
)

export const hasSection = Template.bind({})
hasSection.args = {
  section: { name: 'sectionName' },
  channel: { sectionName: 'sectionName' },
}
export const nullsection = Template.bind({})
nullsection.args = {
  section: { name: null },
  channel: { sectionName: '' },
}
