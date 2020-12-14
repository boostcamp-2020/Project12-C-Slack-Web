import React from 'react'
import NewWorkspaceSection from './NewWorkspaceSection'

export default {
  title: 'Example/NewWorkspaceSection',
  component: NewWorkspaceSection,
}

const Template = args => <NewWorkspaceSection {...args} />

export const defaultNewWorkspaceSection = Template.bind({})
defaultNewWorkspaceSection.args = {}
