import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import LoginPage from './page/LoginPage'
import WorkspaceSelectPage from './page/WorkspaceSelectPage'
import Auth from './hooks/Auth'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/login" component={Auth(LoginPage, false)} />
      <Route exact path="/" component={Auth(WorkspaceSelectPage, true)} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
