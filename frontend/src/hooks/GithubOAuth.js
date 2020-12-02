import React, { useState, useEffect } from 'react'
import request from '../util/request'
import QueryString from 'qs'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'

export default function GithubOAuth(Component, loginRequired) {
  function Authentication(props) {
    const [loading, setloading] = useState(true)
    const history = useHistory()
    useEffect(() => {
      ;(async () => {
        try {
          const query = QueryString.parse(props.location.search, {
            ignoreQueryPrefix: true,
          })
          await request.GET(
            '/api/user/sign-in/github/callback?code=' + query.code,
          )
          if (loginRequired) {
            history.push('/login')
          }
          if (!loginRequired) {
            history.push('/')
          }
          setloading(false)
        } catch (err) {
          toast.error('인증이 실패하였습니다', {
            onClose: () => history.go(0),
          })
        }
      })()
    }, [])
    return !loading && <Component {...props} />
  }
  return Authentication
}
