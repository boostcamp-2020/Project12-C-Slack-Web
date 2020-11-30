import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import './index.css'
import Channel from './page/channel/Channel'
import WorkspacePage from './page/WorkspacePage'
import { BrowserRouter, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import LoginPage from './page/LoginPage'
import WorkspaceSelectPage from './page/WorkspaceSelectPage'
import Auth from './hooks/Auth'

const App = () => {
  return (
    <React.StrictMode>
      <GlobalStyle />
      <BrowserRouter>
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route
          exact
          path="/workspaceSelect"
          component={Auth(WorkspaceSelectPage, true)}
        />
        <Route exact path="/" component={Channel} />
        <Route
          path="/workspace/:channelId"
          component={Auth(WorkspacePage, false)}
        />
      </BrowserRouter>
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
