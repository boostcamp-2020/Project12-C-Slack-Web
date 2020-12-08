import React from 'react'
import { storiesOf } from '@storybook/react'
import InviteWorkspaceModal from './InviteWorkspaceModal'
import { Route, MemoryRouter } from 'react-router-dom'

const portal = document.createElement('div')
portal.setAttribute('id', 'portal')
document.querySelector('body').appendChild(portal)
const stories = storiesOf('Organism', module)

const TestComponent = () => {
  const [visible, setVisible] = React.useState(true)
  const handleClose = () => {
    setVisible(!visible)
  }
  return (
    <MemoryRouter
      initialEntries={[
        'workspace/5fcf04301220d5298cefa743/5fcf04301220d5298cefa745',
      ]}
    >
      <Route path="workspace/:workspaceId/:channelId">
        <button onClick={handleClose}>Open Modal</button>
        {visible ? <InviteWorkspaceModal handleClose={handleClose} /> : ''}
      </Route>
    </MemoryRouter>
  )
}
stories.add('InviteWorkspaceModal', () => <TestComponent />)
