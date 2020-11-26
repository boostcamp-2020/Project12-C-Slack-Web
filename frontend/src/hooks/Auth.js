import React, { useState, useEffect } from 'react'
import request from '../util/request'

export default function Auth(Component, loginRequired) {
  function Authentication(props) {
    const [loading, setloading] = useState(true)
    useEffect(() => {
      ;(async () => {
        try {
          const data = await request.GET('/api/user/auth')
          if (!data.verify) {
            // 로그인이 되어 있지 않을때
            if (loginRequired) {
              props.history.push('/login')
            }
          } else {
            if (!loginRequired) {
              // 로그인 유저가 접근하면 안되는 페이지
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
