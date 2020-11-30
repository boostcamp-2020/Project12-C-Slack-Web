import React, { useState, useEffect } from 'react'
import request from '../util/request'
import QueryString from 'qs'
import { toast } from 'react-toastify'

export default function GithubOAuth(Component, loginRequired) {
  function Authentication(props) {
    const [loading, setloading] = useState(true)
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
            props.history.push('/login')
          }
          if (!loginRequired) {
            props.history.push('/')
          }
          setloading(false)
        } catch (err) {
          toast.error('인증이 실패하였습니다', {
            onClose: () => props.history.push('/login'),
          })
        }
      })()
    }, [])
    return !loading && <Component {...props} />
  }
  return Authentication
}
