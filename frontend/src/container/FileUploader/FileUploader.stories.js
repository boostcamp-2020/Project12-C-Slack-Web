import React from 'react'
import { storiesOf } from '@storybook/react'
import FileUploader from './FileUploader'

const stories = storiesOf('Organism', module)

const TestComponent = () => {
  return <FileUploader />
}
stories.add('FileUploader', () => <TestComponent />)
