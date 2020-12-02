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
          await request.DELETE('/api/user/sign-out')
          toast.error('잘못된 접근입니다.', {
            onClose: () => history.goBack(),
          })
        }
      })()
    }, [])
    return !loading && <Component {...props} />
  }
  return Authentication
}
