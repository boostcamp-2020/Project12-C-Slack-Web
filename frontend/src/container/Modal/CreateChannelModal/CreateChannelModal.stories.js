import React from 'react'
import CreateChannelModal from './CreateChannelModal'
import { storiesOf } from '@storybook/react'
import { Route, MemoryRouter } from 'react-router-dom'
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
    <MemoryRouter
      initialEntries={[
        'workspace/5fc4fe2faa1ecd6a71dde1a8/5fc4fe66f303676bad052ea0',
      ]}
    >
      <Route path="workspace/:workspaceId/:channelId">
        <button onClick={handleClose}>Open Modal</button>
        {visible ? <CreateChannelModal handleClose={handleClose} /> : ''}
      </Route>
    </MemoryRouter>
  )
}
stories.add('CreateChannelModal', () => <TestComponent />)
