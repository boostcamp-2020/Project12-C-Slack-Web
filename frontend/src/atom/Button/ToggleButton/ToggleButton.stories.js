import React from 'react'
import Toggle from './ToggleButton'
import { storiesOf } from '@storybook/react'
const stories = storiesOf('Atom/Button', module)
const TestComponent = () => {
  const [value, setValue] = React.useState(false)
  const handleChange = () => {
    console.log(value)
    setValue(!value)
  }
  return <Toggle handleChange={handleChange} value={value} />
}
stories.add('ToggleButton', () => <TestComponent />)
