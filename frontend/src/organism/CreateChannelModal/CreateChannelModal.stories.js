import React from 'react'
import { RecoilRoot } from 'recoil'
import CreateChannelModal from './CreateChannelModal'
import { storiesOf } from '@storybook/react'
const portal = document.createElement('div')
portal.setAttribute('id', 'portal')
document.querySelector('body').appendChild(portal)
const stories = storiesOf('Organism/Modal', module)
const TestComponent = () => {
  const [visible, setVisible] = React.useState(true)
  const handleClose = () => {
    setVisible(!visible)
  }
  return (
    <RecoilRoot>
      <button onClick={handleClose}>Open Modal</button>
      {visible ? <CreateChannelModal handleClose={handleClose} /> : ''}
    </RecoilRoot>
  )
}
stories.add('CreateChannelModal', () => <TestComponent />)
