import { addDecorator } from '@storybook/react'
import GlobalStyle from '../src/presenter/GlobalStyle/GlobalStyle'
import { RecoilRoot } from 'recoil'
import { MemoryRouter } from 'react-router-dom'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

addDecorator(story => (
  <>
    <GlobalStyle />
    <RecoilRoot>
      <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    </RecoilRoot>
  </>
))
