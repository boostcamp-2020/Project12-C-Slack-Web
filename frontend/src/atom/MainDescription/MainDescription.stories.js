import React from 'react'
import MainDescription from './MainDescription'

export default {
  title: 'Atom/MainDescription',
  component: MainDescription,
}

const Template = args => <MainDescription {...args} />

export const DefaultMainDescription = Template.bind({})
DefaultMainDescription.args = {
  children: 'this is main description',
  fontSize: '36px',
  marginBottom: '10px',
  fontWeight: 700,
  lineHeight: '36px',
  textAlign: 'left',
  marginLeft: '8px',
}
