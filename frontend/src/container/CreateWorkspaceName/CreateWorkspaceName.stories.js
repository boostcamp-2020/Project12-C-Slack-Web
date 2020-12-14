import React, { useState } from 'react'
import CreateWorkspaceName from './CreateWorkspaceName'
import { storiesOf } from '@storybook/react'

const stories = storiesOf('Organism/CreateWorkspaceName', module)

const TestComponent = () => {
  const [workspaceName, setWorkspaceName] = useState('abc')
  const [isInputName, setIsInputName] = useState(false)
  return (
    <>
      <CreateWorkspaceName
        workspaceName={workspaceName}
        setWorkspaceName={setWorkspaceName}
        setIsInputName={setIsInputName}
      />
    </>
  )
}

stories.add('CreateWorkspaceName', () => <TestComponent />)
