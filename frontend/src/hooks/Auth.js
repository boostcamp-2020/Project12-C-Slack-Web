import React, { useState, useEffect } from 'react'
import request from '../util/request'
import { toast } from 'react-toastify'

export default function Auth(Component, loginRequired) {
  function Authentication(props) {
    const [loading, setloading] = useState(true)
    useEffect(() => {
      ;(async () => {
        try {
          const res = await request.GET('/api/user/auth')
          if (res.status !== 200 && loginRequired) {
            props.history.push('/login')
          }
          if (res.status === 200 && !loginRequired) {
            props.history.push('/')
          }
          setloading(false)
        } catch (err) {
          props.history.push('/login')
          toast.error(err)
          console.error(err)
        }
      })()
    }, [])
    return !loading && <Component {...props} />
  }
  return Authentication
}
