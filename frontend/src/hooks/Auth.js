import React, { useState, useEffect } from 'react'
import request from '../util/request'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'

export default function Auth(Component, loginRequired) {
  function Authentication(props) {
    const [loading, setloading] = useState(true)
    const history = useHistory()
    useEffect(() => {
      ;(async () => {
        try {
          const res = await request.GET('/api/user/auth')
          if (res.status !== 200 && loginRequired) {
            history.push('/login')
          }
          if (res.status === 200 && !loginRequired) {
            history.push('/')
          }
          setloading(false)
        } catch (err) {
          // 토큰이 만료된 경우
          await request.DELETE('/api/user/sign-out')
          toast.error('로그인이 필요합니다.', {
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
