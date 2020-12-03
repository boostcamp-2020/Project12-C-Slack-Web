import React from 'react'
import SelectWorkspace from './SelectWorkspace'

export default {
  title: 'Page/SelectWorkspace',
  component: SelectWorkspace,
}

const Template = args => <SelectWorkspace {...args} />

export const defaultSelectWorkspace = Template.bind({})
defaultSelectWorkspace.args = {}
