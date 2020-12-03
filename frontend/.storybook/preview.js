import { addDecorator } from '@storybook/react'
import GlobalStyle from '../src/atom/GlobalStyle/GlobalStyle'
import { RecoilRoot } from 'recoil'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

addDecorator(story => (
  <>
    <GlobalStyle />
    <RecoilRoot>{story()}</RecoilRoot>
  </>
))
