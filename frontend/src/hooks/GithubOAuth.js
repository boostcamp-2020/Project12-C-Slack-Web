import React, { useState, useEffect } from 'react'
import request from '../util/request'
import QueryString from 'qs'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_API_URL

export default function GithubOAuth(Component) {
  function Authentication(props) {
    const [loading, setloading] = useState(true)
    const history = useHistory()
    useEffect(() => {
      ;(async () => {
        try {
          const query = QueryString.parse(props.location.search, {
            ignoreQueryPrefix: true,
          })
          const invitecode = localStorage.getItem('invitecode')
          await request.GET(
            '/api/user/sign-in/github/callback?code=' + query.code,
          )
          if (invitecode) {
            localStorage.removeItem('invitecode')
            window.location.href = `${baseURL}/api/workspace/invite/${invitecode}`
            return
          }
          history.push('/')
          setloading(false)
        } catch (err) {
          toast.error('인증이 실패하였습니다', {
            onClose: () => history.go(0),
          })
        }
      })()
      return () => setloading(false)
    }, [])
    return !loading && <Component {...props} />
  }
  return Authentication
}
