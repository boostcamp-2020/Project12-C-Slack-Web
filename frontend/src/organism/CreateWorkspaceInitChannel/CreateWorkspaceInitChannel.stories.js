import React, { useState } from 'react'
import CreateWorkspaceInitChannel from './CreateWorkspaceInitChannel'
import { storiesOf } from '@storybook/react'

const stories = storiesOf('Organism/CreateWorkspaceInitChannel', module)

const TestComponent = () => {
  const [workspaceName, setWorkspaceName] = useState('')
  return (
    <>
      <CreateWorkspaceInitChannel
        workspaceName={workspaceName}
        setWorkspaceName={setWorkspaceName}
      />
    </>
  )
}

stories.add('CreateWorkspaceInitChannel', () => <TestComponent />)
