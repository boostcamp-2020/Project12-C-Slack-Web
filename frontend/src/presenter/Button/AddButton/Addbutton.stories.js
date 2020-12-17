import React from 'react'
import AddButton from './AddButton'

export default {
  title: 'Atom/AddButton',
  component: AddButton,
}

const Template = args => <AddButton {...args} />
let isOpen = true

export const Default = Template.bind({})
Default.args = {
  isOpen: isOpen,
  title: 'Default',
  onClick: () => {
    isOpen = !isOpen
  },
}
