import React, { useState, useEffect } from 'react'
import request from '../util/request'
import QueryString from 'qs'

export default function GithubOAuth(Component, loginRequired) {
  function Authentication(props) {
    const [loading, setloading] = useState(true)
    useEffect(() => {
      ;(async () => {
        try {
          const query = QueryString.parse(props.location.search, {
            ignoreQueryPrefix: true,
          })
          console.log('query.code: ', query.code)
          const data = await request.GET(
            '/api/user/sign-in/github/callback?code=' + query.code,
          )
          if (!data.verify) {
            if (loginRequired) {
              props.history.push('/login')
            }
          } else {
            if (!loginRequired) {
              props.history.push('/')
            }
          }
          setloading(false)
        } catch (err) {
          console.error(err)
        }
      })()
    }, [])
    return !loading && <Component {...props} />
  }
  return Authentication
}
