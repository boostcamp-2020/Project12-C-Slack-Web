import React from 'react'
import MyWorkspaceSection from './MyWorkspaceSection'

export default {
  title: 'Organism/MyWorkspaceSection',
  component: MyWorkspaceSection,
}

const Template = args => <MyWorkspaceSection {...args} />

export const defaultMyWorkspaceSection = Template.bind({})
defaultMyWorkspaceSection.args = {}
