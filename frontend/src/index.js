import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import './index.css'
import Channel from './page/channel/Channel'
import WorkspacePage from './page/WorkspacePage'
import { BrowserRouter, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import LoginPage from './page/login/Login'
import SelectWorkspace from './page/selectWorkspace/SelectWorkspace'
import Auth from './hooks/Auth'
import GithubOAuth from './hooks/GithubOAuth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CreateWorkspace from './page/createWorkspace/CreateWorkspace'

const App = () => {
  return (
    <React.StrictMode>
      <ToastContainer />
      <GlobalStyle />
      <BrowserRouter>
        <Route exact path="/" component={Channel} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route path="/github-oauth" component={GithubOAuth(LoginPage, false)} />
        <Route
          exact
          path="/select-workspace"
          component={Auth(SelectWorkspace, true)}
        />
        <Route
          exact
          path="/create-workspace"
          component={Auth(CreateWorkspace, true)}
        />
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
