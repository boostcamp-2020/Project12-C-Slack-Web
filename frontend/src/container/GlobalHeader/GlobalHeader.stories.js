import React from 'react'
import GlobalHeader from './GlobalHeader'
import { storiesOf } from '@storybook/react'

const stories = storiesOf('Organism/GlobalHeader', module)

const TestComponent = () => {
  return <GlobalHeader />
}

stories.add('GlobalHeader', () => <TestComponent />)
