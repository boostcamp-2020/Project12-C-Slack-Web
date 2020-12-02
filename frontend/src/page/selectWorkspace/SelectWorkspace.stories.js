import React from 'react'
import WorkspaceSelect from './SelectWorkspace'

export default {
  title: 'Page/WorkspaceSelect',
  component: WorkspaceSelect,
}

const Template = args => <WorkspaceSelect {...args} />

export const defaultWorkspaceSelect = Template.bind({})
defaultWorkspaceSelect.args = {}
