import React from 'react'
import CreateWorkspace from './CreateWorkspace'
import { storiesOf } from '@storybook/react'

const stories = storiesOf('Page/CreateWorkspace', CreateWorkspace)

const TestComponent = () => {
  return (
    <>
      <CreateWorkspace />
    </>
  )
}
stories.add('CreateWorkspace', () => <TestComponent />)
