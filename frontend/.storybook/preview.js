import { addDecorator } from '@storybook/react'
import GlobalStyle from '../src/atom/GlobalStyle/GlobalStyle'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

addDecorator(story => (
  <>
    <GlobalStyle />
    {story()}
  </>
))
