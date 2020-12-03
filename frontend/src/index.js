import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import './index.css'
import Channel from './page/channel/Channel'
import WorkspacePage from './page/WorkspacePage'
import { BrowserRouter, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import LoginPage from './page/login/Login'
import WorkspaceSelectPage from './page/WorkspaceSelectPage'
import Auth from './hooks/Auth'
import GithubOAuth from './hooks/GithubOAuth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RecoilRoot } from 'recoil'

const App = () => {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <ToastContainer />
        <GlobalStyle />
        <BrowserRouter>
          <Route exact path="/" component={Channel} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route
            path="/github-oauth"
            component={GithubOAuth(LoginPage, false)}
          />
          <Route
            exact
            path="/workspace-select"
            component={Auth(WorkspaceSelectPage, true)}
          />
          <Route
            path="/workspace/:channelId"
            component={Auth(WorkspacePage, false)}
          />
        </BrowserRouter>
      </RecoilRoot>
    </React.StrictMode>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0px;
    margin: 0px;
    height: 100%;
    width: 100%;
	}
`

ReactDOM.render(<App />, document.getElementById('root'))
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
