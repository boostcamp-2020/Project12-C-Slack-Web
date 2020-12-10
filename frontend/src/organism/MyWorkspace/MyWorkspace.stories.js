import React from 'react'
import MyWorkspace from './MyWorkspace'

export default {
  title: 'Organism/MyWorkspace',
  component: MyWorkspace,
}

const Template = args => <MyWorkspace {...args} />

export const defaultMyWorkspace = Template.bind({})
defaultMyWorkspace.args = {
  workspaceName: '첫번째 워크스페이스',
}
